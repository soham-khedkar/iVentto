import React, { useState } from 'react'
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { ICategory } from '@/lib/database/models/category.model'
  
type DropdownProps = {
    value?: string
    onChangeHandler?: (value:string) => void
} 
const Dropdown = ({value,onChangeHandler}: DropdownProps) => {
    const [categories, setCategories] = useState<ICategory[]>([])
  return (
    <Select onValueChange={onChangeHandler} defaultValue={value}>
  <SelectTrigger className="select-field">
    <SelectValue placeholder="Category" />
  </SelectTrigger>
  <SelectContent>
    {categories.length > 0}
    <SelectItem value="light">Light</SelectItem>
    <SelectItem value="dark">Dark</SelectItem>
    <SelectItem value="system">System</SelectItem>
  </SelectContent>
</Select>

  )
}

export default Dropdown