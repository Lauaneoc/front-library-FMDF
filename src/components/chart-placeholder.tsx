import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"

interface ChartPlaceholderProps {
  title: string
  height?: number
}

export function ChartPlaceholder({ title, height = 300 }: ChartPlaceholderProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg font-semibold text-foreground">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="w-full bg-muted rounded-lg flex items-center justify-center" style={{ height: `${height}px` }}>
          <div className="text-center">
            <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
              <div className="w-8 h-8 bg-primary/40 rounded-full"></div>
            </div>
            <p className="text-sm text-muted-foreground">Gráfico: {title}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
