import { Button } from "@/components/ui/button"
import { Item, ItemContent, ItemGroup, ItemHeader } from "@/components/ui/item"
import { ArrowLeft, X } from "lucide-react"
import { useNavigate } from "react-router"

const UpGradePage = () => {
    const navigate = useNavigate();

    return (
        <div>
            <header className="flex"><Button className="hover:bg-transparent hover:cursor-pointer" variant={'ghost'} onClick={() => navigate(-1)}><ArrowLeft /> Home</Button></header>
            <ItemGroup className="grid grid-cols-3 w-screen justify-center p-10 gap-10">
                <Item variant={"outline"}>
                    <ItemHeader>
                        <p>1 Month</p>
                    </ItemHeader>

                    <ItemContent></ItemContent>
                </Item>
                <Item variant={"outline"}>
                    <ItemHeader>
                        <p>3 Month</p>
                    </ItemHeader>
                    <ItemContent></ItemContent>
                </Item>
                <Item variant={"outline"}>
                    <ItemHeader>
                        <p>1 Year</p>
                    </ItemHeader>
                    <ItemContent></ItemContent>
                </Item>
            </ItemGroup>
        </div>
    )
}

export default UpGradePage