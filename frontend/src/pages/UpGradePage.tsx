import { Button } from "@/components/ui/button";
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemGroup,
  ItemHeader,
} from "@/components/ui/item";
import { Description } from "@radix-ui/react-dialog";
import { ArrowLeft, Sparkles, X } from "lucide-react";
import { useNavigate } from "react-router";
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import GradientText from "@/components/GradientText";

const UpGradePage = () => {
  const navigate = useNavigate();
  const { currentUser } = useAppSelector((state) => state.auth);

  const plans = [
    {
      id: "1 Month",
      description:
        "Phù hợp cho người dùng thử hoặc các bạn ôn gấp trước khi thi",
      price: "29.000",
      feature: [
        "Truy cập vào tài nguyên Premium",
        "Học không giới hạn",
        "Ưu tiên hỗ trợ khi gặp vấn đề về bài thi",
      ],
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
    },
    {
      id: "1 Year",
      description: "Lựa chọn tốt nhất cho việc ôn thi nghiêm túc",
      price: "69.000",
      feature: [
        "Hưởng mọi đặc quyền của gói 3 tháng",
        "FUE AI không giới hạn",
        "Truy cập vào toàn bộ tool tiện ích",
      ],
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

      <ItemGroup className="grid grid-cols-3 w-screen justify-center p-10 gap-10">
        {plans.map((p) => (
          <Item variant={"outline"} key={p.id}>
            <ItemHeader className="flex flex-col items-start">
              <p className="text-lg font-bold">{p.id}</p>
              <ItemDescription>
                <p>{p.description}</p>
              </ItemDescription>
            </ItemHeader>
            <ItemContent>
              <div>
                <span className="font-[999] text-4xl">{p.price}</span>{" "}
                <span className="text-[10px] font-semibold text-gray-300">
                  VND
                </span>
              </div>
            </ItemContent>
          </Item>
        ))}
      </ItemGroup>
    </div>
  );
};

export default UpGradePage;
