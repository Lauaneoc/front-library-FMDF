"use client";

import { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./ui/sheet";
import { Badge } from "./ui/badge";
import { Filter, X } from "lucide-react";

interface FilterOption {
  key: string;
  label: string;
  type: "text" | "select" | "date";
  options?: { value: string; label: string }[];
}

interface FiltersDrawerProps {
  filters: FilterOption[];
  onFiltersChange?: (filters: Record<string, string>) => void;
}

export function FiltersDrawer({ filters, onFiltersChange }: FiltersDrawerProps) {
  const [activeFilters, setActiveFilters] = useState<Record<string, string>>({});
  const [isOpen, setIsOpen] = useState(false);

  const handleFilterChange = (key: string, value: string) => {
    const newFilters = { ...activeFilters };
    if (value) {
      newFilters[key] = value;
    } else {
      delete newFilters[key];
    }
    setActiveFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const clearFilter = (key: string) => handleFilterChange(key, "");
  const clearAllFilters = () => {
    setActiveFilters({});
    onFiltersChange?.({});
  };

  const activeFilterCount = Object.keys(activeFilters).length;

  return (
    <div className="space-y-4">
      <div>
        <Sheet open={isOpen} onOpenChange={setIsOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="sm" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filtros
              {activeFilterCount > 0 && (
                <Badge variant="secondary">{activeFilterCount}</Badge>
              )}
            </Button>
          </SheetTrigger>
          <SheetContent
            className="bg-white text-foreground border-l border-border shadow-lg px-4"
          >
            <SheetHeader>
              <SheetTitle>Filtros</SheetTitle>
              <SheetDescription>
                Configure os filtros para refinar sua busca
              </SheetDescription>
            </SheetHeader>

            <div className="mt-6 space-y-4">
              {filters.map((filter) => (
                <div key={filter.key} className="space-y-1.5">
                  <Label className="text-sm font-medium text-foreground">
                    {filter.label}
                  </Label>

                  {filter.type === "text" && (
                    <Input
                      id={filter.key}
                      label=""
                      value={activeFilters[filter.key] || ""}
                      onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                      className="bg-background border-input focus-visible:ring-ring"
                      placeholder={`Filtrar por ${filter.label.toLowerCase()}`}
                    />
                  )}

                  {filter.type === "select" && filter.options && (
                    <Select
                      value={activeFilters[filter.key] || ""}
                      onValueChange={(value) => handleFilterChange(filter.key, value)}
                    >
                      <SelectTrigger className="bg-background border-input">
                        <SelectValue placeholder={`Selecionar ${filter.label.toLowerCase()}`} />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        {filter.options.map((option) => (
                          <SelectItem key={option.value} value={option.value}>
                            {option.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  )}

                  {filter.type === "date" && (
                    <Input
                      id={filter.key}
                      label=""
                      type="date"
                      value={activeFilters[filter.key] || ""}
                      onChange={(e) => handleFilterChange(filter.key, e.target.value)}
                      className="bg-background border-input focus-visible:ring-ring"
                    />
                  )}
                </div>
              ))}

              {activeFilterCount > 0 && (
                <Button
                  variant="secondary"
                  onClick={clearAllFilters}
                  className="w-full"
                >
                  Limpar todos os filtros
                </Button>
              )}
            </div>
          </SheetContent>
        </Sheet>
      </div>

      {activeFilterCount > 0 && (
        <div className="flex flex-wrap items-center gap-2">
          {Object.entries(activeFilters).map(([key, value]) => {
            const filter = filters.find((f) => f.key === key);
            return (
              <Badge
                key={key}
                variant="outline"
                className="flex items-center gap-2 px-3 py-1"
              >
                <span className="text-xs font-medium">
                  {filter?.label}: {value}
                </span>
                <button
                  onClick={() => clearFilter(key)}
                  className="hover:text-destructive transition-colors"
                >
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            );
          })}
        </div>
      )}
    </div>
  );
}
