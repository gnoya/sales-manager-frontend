import { useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import styles from './date-picker.component.module.css'
import './date-picker-custom.css'

interface CustomDatePickerProps {
  onDateChange: (date: Date) => void
}

export default function CustomDatePicker({
  onDateChange,
}: CustomDatePickerProps) {
  const [date, setDate] = useState<Date | null>(null)

  return (
    <DatePicker
      selected={date}
      onChange={(date: Date) => {
        setDate(date)
        onDateChange(date)
      }}
      showTimeSelect
      dateFormat="dd/MM/yyyy h:mm aa"
      className={styles.datePicker}
      placeholderText="Pick delivery date"
    />
  )
}
