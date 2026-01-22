import { Button } from "@/components/ui/button";
import {
  Item,
  ItemActions,
  ItemContent,
  ItemDescription,
  ItemFooter,
  ItemGroup,
  ItemHeader,
} from "@/components/ui/item";
import { Description } from "@radix-ui/react-dialog";
import { ArrowLeft, CircleCheck, Sparkles, X } from "lucide-react";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import GradientText from "@/components/GradientText";
import { getPayment } from "@/features/payment/paymentSlice";
import { useState } from "react";
import { Spinner } from "@/components/ui/spinner";

const UpGradePage = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [loadingPlanId, setLoadingPlanId] = useState<string | null>(null)




  const handleProcessPayment = async (planId: string, amount: number) => {
    try {
      setLoadingPlanId(planId)
      const actionResult = await dispatch(getPayment({planId, amount})).unwrap()

      if(actionResult){
        window.location.href = String(actionResult.checkoutUrl)
      }
      setLoadingPlanId(null)
    } catch (error) {
      console.log("Error: ", error)
    }
  }

  const plans = [
    {
      id: "1 Month",
      description:
        "Phù hợp cho người dùng thử hoặc các bạn ôn gấp trước khi thi",
      price: "29.000",
      feature: ["Truy cập vào tài nguyên Premium", "Học không giới hạn", "Tối đa hóa trải nghiệm  "],
      amount: 29000
    },
    {
      id: "3 Month",
      description: "Lựa chọn tốt nhất cho việc ôn thi nghiêm túc",
      price: "69.000",
      feature: [
        "Hưởng mọi đặc quyền của gói 1 tháng",
        "A.I hỗ trợ tạo đề thi có giới hạn",
        "Truy cập vào một số tool tiện ích",
      ],
      amount: 69000
    },
    {
      id: "1 Year",
      description: "Lựa chọn tốt nhất cho việc ôn thi nghiêm túc",
      price: "399.000",
      feature: [
        "Hưởng mọi đặc quyền của gói 3 tháng",
        "FUE AI không giới hạn",
        "Truy cập vào toàn bộ tool tiện ích",
      ],
      amount: 399000
    },
  ];



  return (
    <div>
      <header className="flex">
        <Button
          className="hover:bg-transparent hover:cursor-pointer"
          variant={"ghost"}
          onClick={() => navigate(-1)}
        >
          <ArrowLeft /> Home
        </Button>
      </header>
      <div className="flex flex-col items-center w-screen gap-5">
        <div className="text-4xl font-sans font-bold">
          Mở khoá toàn bộ tiềm năng của{" "}
          <span className="bg-blue-400 pr-2 pl-2 pb-1 text-white"> FUE</span>
        </div>

        <div className="w-screen text-center">
          <p>
            Chọn gói phù hợp để bứt phá số điểm ngay hôm nay. Truy cập không
            giới hạn ,
            <span className="flex justify-center">
              được tích hợp
              <GradientText
                colors={["#40ffaa", "#4079ff", "#40ffaa", "#4079ff", "#40ffaa"]}
                animationSpeed={3}
                showBorder={false}
                className="custom-class pl-1 pr-1"
              >
                FUE AI
              </GradientText>
              hỗ trợ
            </span>{" "}
          </p>
        </div>
      </div>
      <div className="flex flex-col h-full">
        <ItemGroup className="grid grid-cols-3 w-screen justify-center p-10 gap-10">
          {plans.map((p) => (
            <Item variant={"outline"} key={p.id}>
              <ItemHeader className="flex flex-col items-start">
                <p className="text-lg font-bold">{p.id}</p>
                <ItemDescription>
                  <p>{p.description}</p>
                </ItemDescription>
              </ItemHeader>

              <ItemContent className="">
                <div className="">
                  <span className="font-[999] text-4xl">{p.price}</span>{" "}
                  <span className="text-[10px] font-semibold text-gray-300">
                    VND
                  </span>
                </div>

                <div className="p-5 flex flex-col gap-3">
                  {p.feature.map((f, index) => (
                    <p key={index} className="w-full flex gap-2 items-center">
                      <CircleCheck className="bg-green-400 rounded-4xl" /> {f}
                    </p>
                  ))}
                </div>
              </ItemContent>

              <ItemFooter>
                <ItemActions className="pl-10 pr-10 pt-5 w-full">
                  <Button className="w-full py-6 rounded-3xl font-sans text-lg" disabled={loadingPlanId !== null} onClick={() => handleProcessPayment(p.id, p.amount)}>
                    {loadingPlanId ? <Spinner/> : 'Đăng kí'}
                  </Button>
                </ItemActions>
              </ItemFooter>
            </Item>
          ))}
        </ItemGroup>
      </div>
    </div>
  );
};

export default UpGradePage;
