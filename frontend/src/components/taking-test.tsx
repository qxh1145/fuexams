import React, { useEffect, useState } from 'react'
import { Card, CardContent, CardFooter, CardHeader } from './ui/card'
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'
import { getExams, type IOptions } from '@/features/exams/testSlice'
import { useParams } from 'react-router'
import { Button } from './ui/button'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Progress } from "@/components/ui/progress"
import { cn } from '@/lib/utils'

const TestProcess = () => {
    // 1. State lưu vị trí câu hỏi hiện tại
    const [index, setIndex] = useState(0)

    // 2. State lưu ID đáp án người dùng ĐÃ CHỌN (Quan trọng: Lưu ID, không lưu boolean)
    // Nếu null nghĩa là chưa chọn gì cả.
    const [selectedOptionText, setSelectedOptionText] = useState<string[]>([]); // luu kieu du lieu la mang string, gia tri khoi tao la mang rong

    const dispatch = useAppDispatch()
    const { slug: examSlug } = useParams<{ slug: string }>();
    const { exams, isLoading } = useAppSelector((state) => state.exam)

    useEffect(() => { dispatch(getExams()) }, [dispatch])

    // 3. Reset lựa chọn về null mỗi khi chuyển sang câu hỏi mới
    useEffect(() => {
        setSelectedOptionText([]);
    }, [index]);

    if (isLoading) return <div className="p-10 text-center">Đang tải dữ liệu...</div>;

    const currentExam = exams.filter((e) => e.slug === examSlug);

    // Safety check: Đảm bảo có dữ liệu trước khi render
    if (!currentExam || currentExam.length === 0) {
        return <div className="p-10 text-center text-red-500">Không tìm thấy bài thi!</div>;
    }

    const questionList = currentExam[0].questions;
    const totalQuestions = questionList.length;
    const currentQuestion = questionList[index];

    const correctCount = currentQuestion.options.filter((o) => o.isCorrect === true).length
    const showResult = selectedOptionText.length >= correctCount

    const handleSelectOption = (optionText: string) => {
        if (showResult) return

        setSelectedOptionText(prev => {
            if (prev.includes(optionText)) {
                return prev.filter(text => text !== optionText)
            }
            return [...prev, optionText]
        })
    }

    // Logic chuyển câu hỏi
    const handleChangeQuestion = (isNext: boolean) => {
        if (isNext) {
            if (index < totalQuestions - 1) setIndex(prev => prev + 1);
            else setIndex(0);
        } else {
            if (index > 0) setIndex(prev => prev - 1);
            else setIndex(totalQuestions - 1);
        }
    }


    // 5. Hàm tính toán Class CSS cho từng nút (Dynamic Styling)
    const getOptionClass = (op: IOptions) => {
        const baseClass = "w-full h-20 whitespace-normal px-4 border-2"; // Class mặc định
        const isSelected = selectedOptionText.includes(op.text)

        // chua chon du so luong
        if (!showResult) {
            if (isSelected) {
                return `${baseClass} border-blue-500 bg-blue-50 text-blue-700`;
            }
            return `${baseClass} border-gray-500`
        }

        //da chon du sl
        if (isSelected) {
            return op.isCorrect
                ? cn(baseClass, 'bg-green-200 border-green-600 text-green-800 hover:bg-green-200 hover:border-green-600 hover:text-green-800')
                : cn(baseClass, 'bg-red-200 border-red-600 text-red-800 hover:bg-red-200 hover:border-red-600 hover:text-red-800')
        }
        // Trường hợp C: (Optional) Hiển thị đáp án đúng cho người dùng biết nếu họ chọn sai
        if (op.isCorrect) {
            return cn(baseClass, `border-green-500 border-dashed text-green-700 hover:border-green-500 hover:border-dashed hover:text-green-700 hover:bg-white-100 `);
        }

        // Trường hợp D: Các nút còn lại (không chọn, không phải đáp án đúng) -> Làm mờ
        return `${baseClass} opacity-50`;
    }

    const progressPercent = totalQuestions > 0 ? ((index + 1) / totalQuestions) * 100 : 0;

    return (
        <div className="w-full mx-auto min-h-screen flex flex-col pt-10 px-4">
            <div className="pb-5">
                <Progress value={progressPercent} className="w-full h-3" />
            </div>
            <Card className=''>
                <CardHeader className='flex justify-between'>
                    
                    <p>Question: {index + 1} / {totalQuestions}</p>
                    <div className='flex justify-between gap-15 italic'>
                        <span className='flex items-center hover:cursor-pointer select-none ' onClick={() => handleChangeQuestion(false)}>
                            <ChevronLeft /> Previous
                        </span>
                        <span className='flex items-center hover:cursor-pointer select-none' onClick={() => handleChangeQuestion(true)}>
                            Next <ChevronRight />
                        </span>
                    </div>

                </CardHeader>

                <CardContent>{questionList[index].content}</CardContent>

                <CardFooter className="block w-full">
                    <div className='grid grid-cols-2 gap-5 '>
                        {questionList[index].options.map((op) => (
                            <Button
                                key={op.text}
                                variant="outline"

                                // Gọi hàm để lấy class tương ứng cho nút này
                                className={getOptionClass(op)}

                                // Truyền ID vào hàm xử lý click
                                onClick={() => handleSelectOption(op.text)}
                            >
                                {op.text}
                            </Button>
                        ))}
                    </div>
                </CardFooter>


            </Card>
        </div>
    )
}

export default TestProcess;