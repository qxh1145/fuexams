import BlurText from "@/components/BlurText"
import SplitText from "@/components/SplitText"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Item, ItemContent, ItemDescription, ItemGroup, ItemHeader, ItemTitle } from "@/components/ui/item"
import img1 from '@/assets/card-asset-1.png'
import img2 from '@/assets/card-asset-2.png'
import img3 from '@/assets/card-asset-3.png'
import img4 from '@/assets/card-asset-4.png'
import { Button } from "@/components/ui/button"
import { Facebook, Instagram, Linkedin, LogIn } from "lucide-react"
import { useNavigate } from "react-router"
import { ButtonGroup } from "@/components/ui/button-group"
import ShinyText from "@/components/ShinyText"

const HomePage = () => {
  const navigate = useNavigate();
  return (
    <div className="flex flex-col min-h-screen">
      <div className="flex-1">
        <div className="text-center">
          <SplitText
            text={'Bạn muốn học như thế nào ? '}
            delay={30}
            duration={2}
            className="pt-20 text-center text-4xl font-extrabold tracking-tight text-balance" onLetterAnimationComplete={undefined} />
          <div className="justify-center place-items-center mt-5">
            <BlurText
              text="Nắm vững kiến thức đang học với bài kiểm tra thử và hoạt động học tập kết hợp với kho tàng tài nguyên học tập được chắt lọc của FUExams."
              delay={150}
              animateBy="words"
              direction="bottom"
              className="text-2xl mb-8 w-[70%] justify-center" animationFrom={undefined} animationTo={undefined} onAnimationComplete={undefined} />
          </div>

          <div className=" w-full place-items-center">
            <div className="grid grid-cols-4 w-full gap-7 p-10">
              <Item variant={'outline'}>
                <ItemHeader>
                  <ItemTitle>Kiểm tra năng lực</ItemTitle>

                </ItemHeader>
                <ItemContent>
                  <div className="aspect-square rounded-sm object-cover"><img src={img1} /></div>
                </ItemContent>
              </Item>

              <Item variant={'outline'}>
                <ItemHeader>
                  <ItemTitle>Lấp lổ hổng kiến thức</ItemTitle>
                </ItemHeader>
                <ItemContent>
                  <div className=" aspect-square w-full rounded-sm object-cover"><img src={img2} /></div>
                </ItemContent>
              </Item>

              <Item variant={'outline'}>
                <ItemHeader>
                  <ItemTitle>Tăng tốc trước kì thi</ItemTitle>
                </ItemHeader>
                <ItemContent>
                  <div className=" aspect-square w-full rounded-sm object-cover"><img src={img3} /></div>
                </ItemContent>
              </Item>

              <Item variant={'outline'}>
                <ItemHeader>
                  <ItemTitle>Duy trì thói quen học</ItemTitle>
                </ItemHeader>
                <ItemContent>
                  <div className=" aspect-square w-full rounded-sm object-cover"><img src={img4} /></div>
                </ItemContent>
              </Item>
            </div>
          </div>
        </div>
        <div className="flex w-full justify-center p-5"><Button variant={'outline'} className="w-2xs hover:bg-gray-300" onClick={() => navigate('/signin')}>
          <ShinyText
            text="Bắt đầu ngay"
            speed={2}
            delay={0}
            color="#000000"
            shineColor="#ffffff"
            spread={120}
            direction="left"
            yoyo={false}
            pauseOnHover={false}
          />
           <LogIn strokeWidth={1.5} />
        </Button></div>
      </div>

      <div className="border w-full">
        <div className="grid p-10 place-items-center gap-4 "><div>©2025 FUExams – được hỗ trợ bởi AI đưa sức mạnh vào tay bạn.</div>
          <div>
            <ButtonGroup className="gap-4 hover:cursor-pointer">
              <div><Facebook strokeWidth={0.5} /></div>
              <div><Instagram strokeWidth={0.5} /></div>
              <div><Linkedin strokeWidth={0.5} /></div>
            </ButtonGroup>
          </div>
        </div>

      </div>
    </div >
  )
}

export default HomePage