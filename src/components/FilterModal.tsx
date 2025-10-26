import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Slider } from '@/components/ui/slider'
import { Badge } from '@/components/ui/badge'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { X, Filter, MapPin, GraduationCap, Heart, Users, Sparkles } from 'lucide-react'
import * as SliderPrimitive from "@radix-ui/react-slider"
import { cn } from "@/lib/utils"

interface FilterCriteria {
  majors: string[]
  graduationYearRange: [number, number]
  interests: string[]
  mode: 'dating' | 'friends' | 'both'
  campusRadius: number
  nearbySchools: boolean
  gpaRange: [number, number]
  ageRange: [number, number]
}

interface FilterProps {
  onApplyFilters: (filters: FilterCriteria) => void
  onClearFilters: () => void
  isOpen: boolean
  onClose: () => void
  mode?: 'dating' | 'friends'
}

const availableMajors = [
  'Computer Science', 'Engineering', 'Business', 'Medicine', 'Law',
  'Psychology', 'Biology', 'Chemistry', 'Mathematics', 'Physics',
  'Economics', 'Political Science', 'History', 'English', 'Art',
  'Music', 'Theater', 'Communications', 'Journalism', 'Education'
]

const availableInterests = [
  'Technology', 'Sports', 'Music', 'Art', 'Travel', 'Photography',
  'Cooking', 'Fitness', 'Reading', 'Gaming', 'Movies', 'Hiking',
  'Coffee', 'Wine', 'Dancing', 'Volunteering', 'Entrepreneurship',
  'Research', 'Writing', 'Languages', 'Fashion', 'Sustainability'
]

// Custom slider component that changes colors based on mode
const ModeSlider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> & { mode: 'dating' | 'friends' }
>(({ className, mode, ...props }, ref) => (
  <SliderPrimitive.Root
    ref={ref}
    className={cn(
      "relative flex w-full touch-none select-none items-center",
      className
    )}
    {...props}
  >
    <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
      <SliderPrimitive.Range className={`absolute h-full ${mode === 'dating' ? 'bg-primary' : 'bg-accent'}`} />
    </SliderPrimitive.Track>
    <SliderPrimitive.Thumb className={`block h-5 w-5 rounded-full border-2 ${mode === 'dating' ? 'border-primary' : 'border-accent'} bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50`} />
  </SliderPrimitive.Root>
))
ModeSlider.displayName = SliderPrimitive.Root.displayName

const FilterModal = ({ onApplyFilters, onClearFilters, isOpen, onClose, mode = 'dating' }: FilterProps) => {
  const [filters, setFilters] = useState<FilterCriteria>({
    majors: [],
    graduationYearRange: [2024, 2026],
    interests: [],
    mode: 'both',
    campusRadius: 5,
    nearbySchools: false,
    gpaRange: [2.0, 4.0],
    ageRange: [18, 25]
  })

  const handleMajorToggle = (major: string) => {
    setFilters(prev => ({
      ...prev,
      majors: prev.majors.includes(major)
        ? prev.majors.filter(m => m !== major)
        : [...prev.majors, major]
    }))
  }

  const handleInterestToggle = (interest: string) => {
    setFilters(prev => ({
      ...prev,
      interests: prev.interests.includes(interest)
        ? prev.interests.filter(i => i !== interest)
        : [...prev.interests, interest]
    }))
  }

  const handleApply = () => {
    onApplyFilters(filters)
    onClose()
  }

  const handleClear = () => {
    setFilters({
      majors: [],
      graduationYearRange: [2024, 2026],
      interests: [],
      mode: 'both',
      campusRadius: 5,
      nearbySchools: false,
      gpaRange: [2.0, 4.0],
      ageRange: [18, 25]
    })
    onClearFilters()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Filter className="w-5 h-5" />
            Discovery Filters
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-4 h-4" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Mode Filter */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Connection Mode
            </Label>
            <Select value={filters.mode} onValueChange={(value: 'dating' | 'friends' | 'both') => 
              setFilters(prev => ({ ...prev, mode: value }))
            }>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="both">Both Dating & Networking</SelectItem>
                <SelectItem value="dating">Dating Only</SelectItem>
                <SelectItem value="friends">Networking Only</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Major Filter */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <GraduationCap className="w-4 h-4" />
              Majors
            </Label>
            <div className="flex flex-wrap gap-2">
              {availableMajors.map(major => (
                <Badge
                  key={major}
                  variant={filters.majors.includes(major) ? "default" : "outline"}
                  className={`cursor-pointer ${
                    filters.majors.includes(major) 
                      ? (mode === 'dating' ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-accent text-accent-foreground hover:bg-accent/90')
                      : (mode === 'dating' ? 'hover:bg-primary/20' : 'hover:bg-accent/20')
                  }`}
                  onClick={() => handleMajorToggle(major)}
                >
                  {major}
                </Badge>
              ))}
            </div>
          </div>

          {/* Graduation Year Range */}
          <div className="space-y-3">
            <Label>Graduation Year Range</Label>
            <div className="px-3">
              <ModeSlider
                value={filters.graduationYearRange}
                onValueChange={(value) => setFilters(prev => ({ ...prev, graduationYearRange: value as [number, number] }))}
                min={2020}
                max={2030}
                step={1}
                mode={mode}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>{filters.graduationYearRange[0]}</span>
                <span>{filters.graduationYearRange[1]}</span>
              </div>
            </div>
          </div>

          {/* Age Range */}
          <div className="space-y-3">
            <Label>Age Range</Label>
            <div className="px-3">
              <ModeSlider
                value={filters.ageRange}
                onValueChange={(value) => setFilters(prev => ({ ...prev, ageRange: value as [number, number] }))}
                min={18}
                max={30}
                step={1}
                mode={mode}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>{filters.ageRange[0]} years</span>
                <span>{filters.ageRange[1]} years</span>
              </div>
            </div>
          </div>

          {/* GPA Range */}
          <div className="space-y-3">
            <Label>GPA Range</Label>
            <div className="px-3">
              <ModeSlider
                value={filters.gpaRange}
                onValueChange={(value) => setFilters(prev => ({ ...prev, gpaRange: value as [number, number] }))}
                min={2.0}
                max={4.0}
                step={0.1}
                mode={mode}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>{filters.gpaRange[0]}</span>
                <span>{filters.gpaRange[1]}</span>
              </div>
            </div>
          </div>

          {/* Interests */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Shared Interests
            </Label>
            <div className="flex flex-wrap gap-2">
              {availableInterests.map(interest => (
                <Badge
                  key={interest}
                  variant={filters.interests.includes(interest) ? "default" : "outline"}
                  className={`cursor-pointer ${
                    filters.interests.includes(interest) 
                      ? (mode === 'dating' ? 'bg-primary text-primary-foreground hover:bg-primary/90' : 'bg-accent text-accent-foreground hover:bg-accent/90')
                      : (mode === 'dating' ? 'hover:bg-primary/20' : 'hover:bg-accent/20')
                  }`}
                  onClick={() => handleInterestToggle(interest)}
                >
                  {interest}
                </Badge>
              ))}
            </div>
          </div>

          {/* Campus Radius */}
          <div className="space-y-3">
            <Label className="flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Campus Radius
            </Label>
            <div className="px-3">
              <ModeSlider
                value={[filters.campusRadius]}
                onValueChange={(value) => setFilters(prev => ({ ...prev, campusRadius: value[0] }))}
                min={1}
                max={50}
                step={1}
                mode={mode}
                className="w-full"
              />
              <div className="flex justify-between text-sm text-muted-foreground mt-2">
                <span>1 mile</span>
                <span className="font-medium">{filters.campusRadius} miles</span>
                <span>50 miles</span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Switch
                id="nearby-schools"
                checked={filters.nearbySchools}
                onCheckedChange={(checked) => setFilters(prev => ({ ...prev, nearbySchools: checked }))}
              />
              <Label htmlFor="nearby-schools">Include nearby schools</Label>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4">
            <Button 
              onClick={handleApply} 
              className={`flex-1 ${
                mode === 'dating' 
                  ? 'bg-primary hover:bg-primary-hover text-primary-foreground' 
                  : 'bg-accent hover:bg-accent/90 text-accent-foreground'
              }`}
            >
              Apply Filters
            </Button>
            <Button variant="outline" onClick={handleClear}>
              Clear All
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default FilterModal
