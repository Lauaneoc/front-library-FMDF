import { BookOpen, Users, GraduationCap, Library, FileText, Settings, BarChart3, Home } from "lucide-react"
import { cn } from "../utils/cn"
import { Link } from "react-router-dom"


interface AppSidebarProps {
  className?: string
}

const navigation = [
  { name: "Dashboard", href: "/dashboard", icon: Home },
  { name: "Locações", href: "/locacoes", icon: BookOpen },
  { name: "Alunos", href: "/alunos", icon: Users },
  { name: "Turmas", href: "/turmas", icon: GraduationCap },
  { name: "Livros", href: "/livros", icon: Library },
  { name: "Exemplares", href: "/exemplares", icon: FileText },
  { name: "Relatórios", href: "/relatorios", icon: BarChart3 },
  { name: "Configurações", href: "/configuracoes", icon: Settings },
]

export function AppSidebar({ className }: AppSidebarProps) {
  return (
    <div className={cn("flex h-full w-64 flex-col bg-card border-r border-border", className)}>
      <div className="flex h-16 items-center px-6 border-b border-border">
        <div className="flex items-center gap-2">
          <Library className="h-8 w-8 text-primary" />
          <span className="text-xl font-semibold text-foreground">Biblioteca Escolar</span>
        </div>
      </div>

      <nav className="flex-1 space-y-1 px-3 py-4">
        {navigation.map((item) => (
          <Link
            key={item.name}
            to={item.href}
            className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
          >
            <item.icon className="h-4 w-4" />
            {item.name}
          </Link>
        ))}
      </nav>
    </div>
  )
}
