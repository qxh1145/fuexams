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
import { BadgeCheckIcon, ChevronLeft, ChevronRightIcon, ChevronsLeft } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import { getExams } from '@/features/exams/testSlice.js'
import { getFolder } from '@/features/exams/examSlice'
import { useNavigate, useParams } from 'react-router'
import { string } from 'zod'


const TestLobby = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const subjectID = useParams();

    const { exams, isLoading } = useAppSelector((state) => state.exam)
    const { folder } = useAppSelector((state) => state.folder)


    useEffect(() => {
        dispatch(getExams())

    }, [dispatch])

    console.log('hello exams', folder.filter((f) => f._id === subjectID.folderid))
    
    return (
        <Sidebar>
            <header>
                <p className='w-fit pt-5 flex hover:cursor-pointer' onClick={() => navigate(-1)}><ChevronLeft size={35} strokeWidth={0.5} /><p className='pt-1'>Goback</p> </p>
            </header>
            <div className="w-full gap-6 grid grid-cols-3 p-3">
                {exams.filter((exam) => exam.folderId === subjectID.folderid).map((exam) => (
                    <Item key={exam._id} variant="outline">
                        <ItemContent>
                            <ItemTitle>{exam.title}</ItemTitle>
                            <ItemDescription>
                                Duration: {exam.duration} minutes <br/> Number of questions: {exam.questions.length}
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
        </Sidebar>
    )
}

export default TestLobby