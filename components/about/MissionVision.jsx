import { Eye, Target } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card"

const MissionVision = () => {
 return (
  <section className="py-24 bg-slate-50 dark:bg-slate-900/50">
   <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

     <Card className="border-l-4 border-l-blue-600 shadow-md hover:shadow-xl transition-all duration-300">
      <CardHeader>
       <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center mb-4 text-blue-600">
        <Target className="w-6 h-6" />
       </div>
       <CardTitle className="text-2xl">Misyonumuz</CardTitle>
      </CardHeader>
      <CardContent>
       <p className="text-muted-foreground text-lg">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae fugiat, consequatur magnam rerum nam modi id eius excepturi vero dolor est et nihil exercitationem quia saepe accusantium necessitatibus quaerat doloribus temporibus? Hic vel deleniti quod maxime unde doloremque vitae, eaque ipsa odit totam omnis impedit temporibus dolore molestias corporis? Magni?
       </p>
      </CardContent>
     </Card>

     <Card className="border-l-4 border-l-cyan-500 shadow-md hover:shadow-xl transition-all duration-300">
      <CardHeader>
       <div className="w-12 h-12 bg-cyan-100 dark:bg-cyan-900/30 rounded-lg flex items-center justify-center mb-4 text-cyan-600">
        <Eye className="w-6 h-6" />
       </div>
       <CardTitle className="text-2xl">Vizyonumuz</CardTitle>
      </CardHeader>
      <CardContent>
       <p className="text-muted-foreground text-lg">
        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae fugiat, consequatur magnam rerum nam modi id eius excepturi vero dolor est et nihil exercitationem quia saepe accusantium necessitatibus quaerat doloribus temporibus? Hic vel deleniti quod maxime unde doloremque vitae, eaque ipsa odit totam omnis impedit temporibus dolore molestias corporis? Magni?
       </p>
      </CardContent>
     </Card>

    </div>
   </div>
  </section>
 )
}

export default MissionVision