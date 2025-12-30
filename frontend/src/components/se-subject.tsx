import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import Sidebar from '@/pages/Sidebar'
import React, { useEffect, useMemo } from 'react'
import { getFolder } from "@/features/exams/examSlice";
import FolderDisplay from './folder-display';
import { useNavigate, useParams } from 'react-router';

const SeSubject = () => {
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const { folder, isLoading } = useAppSelector((state) => state.folder)

    useEffect(() => {
        dispatch(getFolder())
    }, [dispatch])

    console.log('hello', folder)


    const filteredFolder = (filter: String) => {
        switch (filter) {
            case 'Major': {
                return folder.filter(f => f.type === 'Major')
            }
            case 'Semester': return folder.filter(f => f.type === 'Semester')
            case 'Term': return folder.filter(f => f.type === 'Term')
            case 'Subject': return folder.filter(f => f.type === 'Subject')
            default: {
                return folder
            }
        }
    }

    //logic xu ly loc mon hoc
    const seId = "657000000000000000000001"
    const semestersInMajor = useMemo(() => {
        const semesters = folder.filter(f => f.type === 'Semester' && f.parentId === seId)
        return semesters.map(s => s._id)
    }, [folder, seId])

    return (
        <Sidebar>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-5 p-7 from-muted/50 to-background h-full bg-gradient-to-b from-30%">
                {filteredFolder('Subject').filter(subject => semestersInMajor.includes(subject.parentId || "") && subject.belongto?.includes('SE')).map((f) => (
                    <>
                        <FolderDisplay className="border flex  " key={f._id} folder={f} onClick={() => navigate(`/test/${f._id}`)} />
                    </>
                ))}
            </div>

        </Sidebar>

    )
}

export default SeSubject