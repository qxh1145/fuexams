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
const ResultModal = (totalCorrectAnswer: any) => {
    return (
        <div>
            <AlertDialog>
                <AlertDialogTrigger asChild>
                    <Button variant={'ghost'} size={'sm'} className='border hover:cursor-pointer hover:bg-green-300 '>Finish</Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                    <AlertDialogHeader>

                    </AlertDialogHeader>
                        Confirm submit your question
                    <AlertDialogDescription>
                        Are you sure you want to submit your answers? Please review them carefully before submitting.
                    </AlertDialogDescription>
                    <AlertDialogFooter>
                        <AlertDialogCancel variant={"destructive"}>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => console.log("Correct: ",totalCorrectAnswer)}>Submit</AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </div>
    )
}

export default ResultModal