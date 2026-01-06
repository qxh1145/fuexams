import { Item, ItemActions, ItemContent, ItemDescription, ItemTitle } from "./ui/item"
import { Button } from "./ui/button"
import { useNavigate } from "react-router"
import { useAppDispatch, useAppSelector } from "@/hooks/useRedux"

const MyExam = () => {
    const navigate = useNavigate()
    const {exams} = useAppSelector(state => state.exam)
    const {currentUser} = useAppSelector(state => state.auth)
    console.log("my exam" ,exams)
    return (
        <div className="w-full gap-6 grid grid-cols-3 p-3">
            {exams.filter((exam) => exam.authorId === currentUser?.username ).map((exam) => (
                <Item key={exam._id} variant={"outline"}>
                    <ItemContent>
                        <ItemTitle>{exam.title}</ItemTitle>
                        <ItemDescription>
                            Duration: {exam.duration} minutes <br /> Number of questions: {exam.questions.length}
                        </ItemDescription>
                    </ItemContent>
                    <ItemActions>
                        <Button variant="outline" size="sm" onClick={() => navigate(`/test/do-test/${exam.slug}`)}>
                            Take exam
                        </Button>
                    </ItemActions>
                </Item>
            ))}


        </div>
    )
}

export default MyExam