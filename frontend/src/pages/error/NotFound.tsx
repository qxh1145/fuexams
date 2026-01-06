import { SearchIcon } from "lucide-react"
import FuzzyText from '@/components/FuzzyText'
import {
  Empty,
  EmptyContent,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty"
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/components/ui/input-group"
import { Kbd } from "@/components/ui/kbd"
import { SearchInput } from "@/components/search-input"

export function NotFound() {
  return (

    <Empty className="flex h-screen items-center">
      {/* <EmptyHeader> */}
      {/*          
          <EmptyDescription>
            The page you&apos;re looking for doesn&apos;t exist. Try searching for
            what you need below.
          </EmptyDescription> */}
      {/* </EmptyHeader> */}
      <EmptyHeader>
        <div style={{ height: '100px', width: '100%', display: 'flex', justifyContent: 'center' }}>
          <FuzzyText
            fontSize="4rem" // Đặt font to lên để canvas có chiều cao
            baseIntensity={0.41}
            hoverIntensity={1.17}
            letterSpacing={13}
            fuzzRange={40}
            color="red" 
          >
            4 0 4
          </FuzzyText>
        </div>

        {/* EmptyDescription chỉ nên dùng cho text phụ bên dưới */}
        <EmptyDescription>
          Trang bạn tìm kiếm không tồn tại
        </EmptyDescription>
      </EmptyHeader>
      <EmptyContent>
        {/* <InputGroupAddon>
            <SearchIcon />
          </InputGroupAddon>
          <InputGroupAddon align="inline-end">
            <Kbd>/</Kbd>
          </InputGroupAddon> */}
        <SearchInput />
        <EmptyDescription>
          Need help? <a href="#">Contact support</a>
        </EmptyDescription>
      </EmptyContent>
    </Empty>
  )
}
