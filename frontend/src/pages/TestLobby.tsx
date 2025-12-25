import React, { useEffect } from 'react'
import Sidebar from './Sidebar'
import {
    Item,
    ItemActions,
    ItemContent,
    ItemDescription,
    ItemFooter,
    ItemHeader,
    ItemMedia,
    ItemTitle,
} from "@/components/ui/item"
import { BadgeCheckIcon, ChevronRightIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import { getExams } from '@/features/exams/testSlice.js'
import { getFolder } from '@/features/exams/examSlice'
import { useNavigate } from 'react-router'


const TestLobby = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const { exams, isLoading } = useAppSelector((state) => state.exam)
    const { folder } = useAppSelector((state) => state.folder)

    const allFolders = useAppSelector((state) => state.folder.currentFolder)

    useEffect(() => {
        dispatch(getExams())

    }, [dispatch])

    console.log('hello exams', exams)

    return (
        <Sidebar>
            <div className="flex w-full max-w-md flex-col gap-6">

                {exams.filter((exam) => exam.folderId !== allFolders?._id).map((exam) => (
                    <Item key={exam._id} variant="outline">
                        <ItemContent>
                            <ItemTitle>{exam.title}</ItemTitle>
                            <ItemDescription>
                                Duration: {exam.durationMinutes} minutes <br/> Number of questions: {exam.questions.length}
                            </ItemDescription>
                        </ItemContent>
                        <ItemActions>
                            <Button variant="outline" size="sm" onClick={() => navigate(`/test/${exam.slug}`)}>
                                Take exam
                            </Button>
                        </ItemActions>
                    </Item>
                ))}


            </div>
        </Sidebar>
    )
}

export default TestLobby