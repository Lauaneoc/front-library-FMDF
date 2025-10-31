"use client"

import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"

interface FormFieldProps {
  label: string
  id: string
  type?: "text" | "email" | "password" | "date" | "select"
  placeholder?: string
  value?: string
  disabled?: boolean
  required?: boolean
  options?: { value: string; label: string }[]
  description?: string
  onChange?: (value: string) => void
}

export function FormField({
  label,
  id,
  type = "text",
  placeholder,
  value,
  disabled,
  required,
  options,
  description,
  onChange,
}: FormFieldProps) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>

      {type === "select" && options ? (
        <Select value={value} onValueChange={onChange} disabled={disabled}>
          <SelectTrigger>
            <SelectValue placeholder={placeholder} />
          </SelectTrigger>
          <SelectContent>
            {options.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      ) : (
        <Input
          id={id}
          type={type}
          placeholder={placeholder}
          value={value}
          disabled={disabled}
          onChange={(e) => onChange?.(e.target.value)}
        />
      )}

      {description && <p className="text-xs text-muted-foreground">{description}</p>}
    </div>
  )
}
