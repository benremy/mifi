import React from "react"
import ThemeToggle from "@/components/theme-toggle"

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
  } from "@/components/ui/navigation-menu"
  
const MainNav: React.FC = () => {
    return (
        <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>MIFI v0.2</NavigationMenuTrigger>
            <NavigationMenuContent>
              <NavigationMenuLink>Link</NavigationMenuLink>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <ThemeToggle/>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      
    )
  }
  
  export default MainNav