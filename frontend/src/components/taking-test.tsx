import React, { useState } from 'react'
import { Card, CardHeader } from './ui/card'
import { useAppDispatch, useAppSelector } from '@/hooks/useRedux'

const TakingTest = () => {
    const [index, setIndex] = useState(0)

    const {exams} = useAppSelector((state) => state.exam)
  return (
    <div>
        <Card>
            <CardHeader></CardHeader>
        </Card>
    </div>
  )
}

export default TakingTest