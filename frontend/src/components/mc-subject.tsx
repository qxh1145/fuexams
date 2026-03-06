import { useAppDispatch, useAppSelector } from '@/hooks/useRedux';
import Sidebar from '@/pages/Sidebar'
import React, { useEffect } from 'react'
import { getFolder } from "@/features/exams/examSlice";
import FolderDisplay from './folder-display';
import { useNavigate, useParams } from 'react-router';

const McSubject = () => {
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
    //logic xu ly loc mon hoc

    return (
        <Sidebar>
            <div className="grid grid-cols-1 md:grid-cols-10 gap-3 p-7 from-muted/50 to-background h-full bg-gradient-to-b ">
                {filteredFolder('Subject').filter(subject => subject.belongto?.includes('MC')).map((f) => (
                    <FolderDisplay className=" " key={f._id} folder={f} onClick={() => navigate(`/test/${f._id}`)} />
                ))}
            </div>

        </Sidebar>

    )
}

export default McSubject