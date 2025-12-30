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

    <Empty>
      {/* <EmptyHeader> */}


      {/*          
          <EmptyDescription>
            The page you&apos;re looking for doesn&apos;t exist. Try searching for
            what you need below.
          </EmptyDescription> */}
      {/* </EmptyHeader> */}
      <FuzzyText
        baseIntensity={0.41}
        hoverIntensity={1.17}
        letterSpacing={13}
      >
        404
      </FuzzyText>

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
