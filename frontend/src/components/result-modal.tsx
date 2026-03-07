import { Cancel } from "@radix-ui/react-alert-dialog"
import { Button } from "./ui/button"
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { useState } from "react"
import { GoodGrade, LowGrade, MidGrade, NomalGrade, UltraLowGrade } from "@/lib/data"
const ResultModal = ({ totalCorrectAnswer, totalQuestions, handleResetQuestion }: { totalCorrectAnswer: any, totalQuestions: number, handleResetQuestion: () => void }) => {
    const [isSubmitted, setIsSubmitted] = useState(false);


    console.log("test: ", GoodGrade[Math.floor(Math.random() * GoodGrade.length)])

    let excellentScore = GoodGrade[Math.floor(Math.random() * GoodGrade.length)]
    let goodScore = NomalGrade[Math.floor(Math.random() * NomalGrade.length)]
    let midScore = MidGrade[Math.floor(Math.random() * MidGrade.length)]
    let lowScore = LowGrade[Math.floor(Math.random() * LowGrade.length)]
    let ultraLowGrade = UltraLowGrade[Math.floor(Math.random() * UltraLowGrade.length)]

    let score = totalCorrectAnswer * (10 / totalQuestions)

    const renderConratMess = () => {
        switch (true) {
            case score >= 9 && score <= 10: return <span>{excellentScore}</span>
            case score < 9 && score >= 7: return <span>{goodScore}</span>
            case score < 7 && score > 5: return <span>{midScore}</span>
            case score >= 3 && score < 5: return <span>{lowScore}</span>
            case score < 3: return <span>{ultraLowGrade}</span>

        }
    }

    return (
        <div>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button onClick={() => console.log("Total correct answer: ", totalCorrectAnswer)} variant={'ghost'} size={'sm'} className='border hover:cursor-pointer hover:bg-green-300 '>Finish</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    {isSubmitted === false ?
                        <>
                            <AlertDialogHeader>
                                Confirm submit your question
                            </AlertDialogHeader>
                            <AlertDialogDescription>
                                Are you sure you want to submit your answers? Please review them carefully before submitting.
                            </AlertDialogDescription>
                            <AlertDialogFooter>
                                <AlertDialogCancel variant={"destructive"}>Cancel</AlertDialogCancel>
                                <Button onClick={() => setIsSubmitted(true)}>Finish</Button>

                                {/*Plan: update correct answer in next term */}
                            </AlertDialogFooter>
                        </>

                        :
                        <>
                            <AlertDialogHeader>
                                <div className="text-2xl">Your score: <span className="text-green-500 font-bold size-5 ">{score.toFixed(1)}</span> / 10 </div>
                                <div>{renderConratMess()}</div>
                            </AlertDialogHeader>

                            <AlertDialogFooter>
                                <AlertDialogAction variant={"destructive"} onClick={() => {
                                    setIsSubmitted(false)
                                    handleResetQuestion()
                                }}>Try Again</AlertDialogAction>

                                <AlertDialogAction onClick={() => {
                                    setIsSubmitted(false)
                                }}>Review</AlertDialogAction>
                            </AlertDialogFooter>
                        </>

                    }
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default ResultModal