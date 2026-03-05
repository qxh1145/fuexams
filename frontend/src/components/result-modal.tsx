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
import { cn } from "@/lib/utils"
import { useState } from "react"
const ResultModal = ({totalCorrectAnswer} : {totalCorrectAnswer : any}) => {
    const [isSubmitted, setIsSubmitted] = useState(false);
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
                        <AlertDialogHeader>
                            <AlertDialogAction onClick={() => {
                                setIsSubmitted(false)
                                
                            }}>Close</AlertDialogAction>
                        </AlertDialogHeader>
                    }
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default ResultModal