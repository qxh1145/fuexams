import React, { useState } from 'react'
import Sidebar from './Sidebar'
import { Textarea } from '@/components/ui/textarea'
import { Card } from '@/components/ui/card'
import { Field, FieldGroup } from '@/components/ui/field'
import { Item, ItemContent, ItemHeader } from '@/components/ui/item'
import { Input } from '@/components/ui/input'
import { Label } from '@radix-ui/react-label'
import { Checkbox } from '@/components/ui/checkbox'
import { Plus, Trash2, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import { addExams } from '@/features/exams/testSlice'
import { toast } from 'sonner'
const CreateExams = () => {
    const dispatch = useAppDispatch()
    const {currentUser} = useAppSelector((state) => state.auth)

    const [question, setQuestion] = useState([
        {
            id: Date.now(),
            type: "",
            score: 1,
            content: "",
            options: [
                { id: 1, text: '', isCorrect: false },
                { id: 2, text: '', isCorrect: false }
            ]
        }
    ])
    const handleAddQuestion = () => {
        const newQuestion = {
            id: Date.now() + Math.random(),
            type: "",
            score: 1,
            content: "",
            options: [
                { id: 1, text: '', isCorrect: false },
                { id: 2, text: '', isCorrect: false },
            ]
        };
        setQuestion([...question, newQuestion])
    }

    const handleAddOptions = (qId: number) => {
        const updatedQuestion = question.map((q) => {
            if (q.id === qId) {
                return {
                    ...q,
                    options: [
                        ...q.options,
                        { id: Date.now(), text: '', isCorrect: false }
                    ]
                };
            }
            return q;
        });
        setQuestion(updatedQuestion)
    }
    const handleDeleteQuestion = (qId: number) => {
        const updateQuestion = question.filter((q) => q.id !== qId);

        setQuestion(updateQuestion);
    }
    const handleDeleteOption = (qId: number, opId: number) => {
        console.log("hello from hdl")
        const updateQuestion = question.map((q) => {
            if (q.id === qId) {
                return {
                    ...q,
                    options: q.options.filter((op) => op.id !== opId)
                }
            }
            return q
        })
        setQuestion(updateQuestion)
    }

    const [examForm, setExamForm] = useState({
        title: '',
        folderId: null,
        duration: 60,
    })

    const handleSubmitNewExam = async () => {
        try {
            if (!examForm.title) {
                return alert('Tittle cannot blank')
            }
            const finalData = {
                ...examForm,
                title: examForm.title,
                folderId: examForm.folderId || null,
                authorId: currentUser?.username || 'unknown',
                durationMinutes: examForm.duration,
                slug: examForm.title.toLowerCase().replace(/ /g, "-"),
                questions: question.map((q) => ({
                    type: q.type || 'multiple_choice',
                    score: q.score || 1,
                    content: q.content,
                    options: q.options.map((op) => ({
                        text: op.text,
                        isCorrect: op.isCorrect,
                    }))
                }))
            }
            await dispatch(addExams(finalData)).unwrap()
            console.log("Data sending:", finalData);
            toast.success("Complete")
            resetForm()

            
        } catch (error) {
            console.log("failed: ", error)
        }
    }

    // Hàm dọn dẹp form về trạng thái ban đầu
    const resetForm = () => {
        setExamForm({
            title: '',
            folderId: null, 
            duration: 60,   
        });

        setQuestion([
            {
                id: Date.now(), 
                type: "multiple_choice",
                score: 1,
                content: "",
                options: [
                    { id: 1, text: '', isCorrect: false },
                    { id: 2, text: '', isCorrect: false }
                ]
            }
        ]);
    }


    const changeQuestionText = (qId: number, val: string) => {
        const newQuestion = question.map((q) => q.id === qId ? {...q, content: val} : q)

        setQuestion(newQuestion)
    }

    const changeOptionText = (qId: number, opId: number, val: string) => {
        const newQuestion = question.map((q) => {
            if(q.id === qId){
                const newOption = q.options.map(opt => opt.id == opId ? {...opt, text: val} : opt)
                return {...q, options: newOption}
            }
            return q;
        });
        setQuestion(newQuestion);
    }
    
    const handleCheckedChange = (qId: number, opId: number, checked: boolean) => {
        const newQuestion = question.map((q) => {
            if(q.id === qId){
                const newCorrectOpt = q.options.map(opt => opt.id === opId ? {...opt, isCorrect: checked} : opt)
                return {...q, options: newCorrectOpt}
            }
            return q;
        });
        setQuestion(newQuestion)
    }

    const handleTesting = () => {
        console.log("currentUser: ", currentUser?.username)
    }

    return (
        <Sidebar>
            <div className='grid grid-cols-2 p-5'>
                <div className="grid w-full max-w-sm items-center gap-3">
                    <Label className='text-2xl text text-balance' htmlFor="title">Title</Label>
                    <Input value={examForm.title} onChange={(e)=> setExamForm({...examForm, title: e.target.value })} id="title" type="text" placeholder='Tiêu đề siêu ngầu....' />
                </div>
                <div className="grid w-full max-w-sm items-center gap-3">
                    <Label className='text-xs text text-balance' htmlFor="duration">Duration</Label>
                    <Input value={examForm.duration} onChange={(e)=> setExamForm({...examForm, duration: Number(e.target.value) })} id="duration" type="number" defaultValue={60}/>
                </div>
            </div>
            <div className='p-5 '>
                <div className='justify-between flex'>
                    <div className='flex'>
                        <Button onClick={() => handleSubmitNewExam()} variant={'outline'} className='hover:bg-gray-200'>Submit</Button>
                    </div>
                </div>
                {question.map((q, index) => (
                    <Item variant={'outline'} className='mt-5' key={q.id}>
                        <ItemHeader className='flex justify-between'><p>Question: {index + 1}</p>
                            <p className='w-fit hover:cursor-pointer' onClick={() => handleDeleteQuestion(q.id)}><X color='red' /></p>
                        </ItemHeader>
                        <ItemContent className='grid grid-cols-2 gap-5'>
                            <Textarea className='min-h-full' placeholder='hihi' value={q.content} onChange={(e) => changeQuestionText(q.id, e.target.value)} />
                            <div className='grid gap-3'>
                                {q.options.map((option) => (
                                    <div key={option.id}>
                                        <div className="flex items-center gap-3" >
                                            <Checkbox id={`ans-${option.text}`} checked={option.isCorrect} onCheckedChange={(e)=> handleCheckedChange(q.id, option.id, e as boolean)}/>
                                            <Input value={option.text} onChange={(e) => changeOptionText(q.id, option.id, e.target.value)} className='w-[60%]' placeholder="Nhập vào các đáp án - đáp án đúng click vào check" />
                                            <p onClick={() => handleDeleteOption(q.id, option.id)} className='w-fit hover:text-red-500'><Trash2 size={20} /></p>
                                        </div>

                                    </div>

                                ))}
                                <p onClick={() => handleAddOptions(q.id)} className='flex items-center cursor-pointer'><Plus /><span>Thêm đáp án</span></p>

                            </div>
                        </ItemContent>
                    </Item>
                ))}
                <div className='mt-5'>
                    <Button onClick={handleAddQuestion} className='w-full border-dashed border-black p-10 hover:bg-gray-200' variant={'outline'}><Plus/>New Questions</Button>
                </div>
                <Button onClick={handleTesting}>Click Me</Button>
            </div>
        </Sidebar>
    )
}

export default CreateExams