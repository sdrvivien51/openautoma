"use client"

import { useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { Tool } from "@/utils/nocodb";
import { MagicCard } from "@/components/magicui";
import ShinyButton from "@/components/magicui/shiny-button";
import Image from "next/image";
import ToolFilters from "@/components/ToolFilters";

interface ToolGridProps {
  tools: Tool[];
  onSearchChange: (value: string) => void;
  onCategoryChange: (value: string) => void;
  selectedCategory: string;
}

export default function ToolGrid({ 
  tools, 
  onSearchChange, 
  onCategoryChange, 
  selectedCategory 
}: ToolGridProps) {
  const router = useRouter();

  return (
    <div className="space-y-6">
      {/* Tools Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {tools && tools.length > 0 ? (
          tools.map((tool) => (
            <MagicCard
              key={tool.Id}
              gradientSize={400}
              gradientColor="rgba(80, 70, 230, 0.15)"
              className="relative group overflow-hidden rounded-xl border border-border/50 bg-background/50 backdrop-blur-sm transition-all duration-300 hover:shadow-lg"
            >
              <div className="relative z-20 flex flex-col p-6 h-full">
                {/* En-tête avec logo et titre */}
                <div className="flex items-start gap-4">
                  <div className="relative h-16 w-16 flex-shrink-0">
                    {tool.logo ? (
                      <Image
                        src={tool.logo}
                        alt={`Logo ${tool.name}`}
                        fill
                        className="rounded-lg object-cover"
                        sizes="64px"
                      />
                    ) : (
                      <div className="h-full w-full rounded-lg bg-primary/10 flex items-center justify-center text-2xl font-bold text-primary">
                        {tool.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold truncate">{tool.name}</h3>
                    <p className="text-sm text-muted-foreground mt-1 line-clamp-2">
                      {tool.tagline}
                    </p>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-4 text-sm text-muted-foreground line-clamp-3">
                  {tool.description}
                </p>

                {/* Tags et prix */}
                <div className="mt-4 flex flex-wrap gap-2">
                  <Badge variant="secondary" className="bg-primary/10">
                    {tool.categories}
                  </Badge>
                  {tool.rating && (
                    <Badge variant="default" className="bg-yellow-500/10 text-yellow-600">
                      ★ {tool.rating}
                    </Badge>
                  )}
                </div>

                {/* Bouton */}
                <div className="mt-auto pt-6">
                  <ShinyButton
                    onClick={() => router.push(`/tools/${tool.slug}`)}
                    className="w-full justify-center"
                  >
                    Découvrir
                  </ShinyButton>
                </div>
              </div>
              
              {/* Ajout d'un gradient de fond */}
              <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 via-purple-500/5 to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </MagicCard>
          ))
        ) : (
          <div className="col-span-full text-center text-muted-foreground">
            Aucun outil à afficher.
          </div>
        )}
      </div>
    </div>
  );
} 