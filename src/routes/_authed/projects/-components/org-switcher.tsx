import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  IconBrandAppgallery,
  IconCheck,
  IconCommandOff,
  IconDeviceAudioTape,
  IconPlus,
  IconSelector, // Using Selector instead of Chevron for that "Switcher" feel
} from '@tabler/icons-react'
import { useState } from 'react'
import { cn } from '@/lib/utils' // Assuming you have a cn utility

const teams = [
  {
    name: 'Acme Inc',
    logo: IconBrandAppgallery,
    plan: 'Enterprise',
  },
  {
    name: 'Acme Corp.',
    logo: IconDeviceAudioTape,
    plan: 'Startup',
  },
  {
    name: 'Evil Corp.',
    logo: IconCommandOff,
    plan: 'Free',
  },
]

export function OrgSwitcher() {
  const [activeTeam, setActiveTeam] = useState(teams[0])
  const [isExpanded, setIsExpanded] = useState<boolean>(false)
  if (!activeTeam) {
    return null
  }

  return (
    <DropdownMenu open={isExpanded} onOpenChange={setIsExpanded}>
      <DropdownMenuTrigger>
        <Button
          variant="outline"
          role="combobox"
          aria-controls="combobox"
          aria-expanded={isExpanded}
          aria-label="Select a team"
          className={cn(
            'w-50 justify-between px-2.5', // Fixed width prevents layout shifts
            'bg-background/50 backdrop-blur-sm border-muted/20', // Subtle transparency
          )}
        >
          <div className="flex items-center gap-2">
            <div className="flex size-5 items-center justify-center rounded bg-primary/10">
              <activeTeam.logo className="size-3.5 text-primary" />
            </div>
            <span className="truncate text-sm font-medium">
              {activeTeam.name}
            </span>
          </div>
          <IconSelector className="ml-auto size-4 opacity-50" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-50 rounded-xl" align="start">
        <DropdownMenuGroup>
          <DropdownMenuLabel className="text-xs font-normal text-muted-foreground">
            Teams
          </DropdownMenuLabel>
          {teams.map((team, index) => (
            <DropdownMenuItem
              key={team.name}
              onClick={() => setActiveTeam(team)}
              className="gap-2 p-2"
            >
              <div className="flex size-6 items-center justify-center rounded-md border bg-background">
                <team.logo className="size-3.5 shrink-0" />
              </div>
              <div className="flex flex-col gap-0.5 text-left">
                <span className="text-sm font-medium leading-none">
                  {team.name}
                </span>
                <span className="text-xs text-muted-foreground font-normal">
                  {team.plan}
                </span>
              </div>

              {/* Active State Checkmark */}
              {activeTeam.name === team.name && (
                <IconCheck className="ml-auto size-4 text-primary" />
              )}

              {/* Only show shortcut if not active to save space, or remove shortcut entirely for cleaner look */}
              {activeTeam.name !== team.name && (
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              )}
            </DropdownMenuItem>
          ))}
          <DropdownMenuSeparator />
          <DropdownMenuItem className="gap-2 p-2 cursor-pointer">
            <div className="flex size-6 items-center justify-center rounded-md border border-dashed bg-transparent">
              <IconPlus className="size-4" />
            </div>
            <div className="text-muted-foreground text-sm">Add team</div>
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
