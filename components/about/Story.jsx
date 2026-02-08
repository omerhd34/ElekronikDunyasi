
const Story = () => {
 return (
  <section className="py-24">
   <div className="container mx-auto px-4">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
     <div className="relative group">
      <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>
      <div className="relative rounded-2xl bg-card border aspect-video flex items-center justify-center overflow-hidden shadow-xl">
       <img
        src="/electronik-dunyasi.png"
        alt="Elektronik Dünyası Mağazası"
        className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
       />
      </div>
     </div>

     <div className="space-y-6">
      <h2 className="text-3xl font-bold tracking-tight lg:text-4xl relative inline-block">
       Hikayemiz
       <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-primary rounded-full"></span>
      </h2>
      <p className="text-lg text-muted-foreground leading-relaxed">
       Lorem ipsum dolor sit, amet consectetur adipisicing elit. Corporis at quia vero debitis expedita facere dolorum maxime rerum nemo hic. Pariatur architecto, quasi ipsum nemo amet iusto suscipit sapiente a!
      </p>
      <p className="text-lg text-muted-foreground leading-relaxed">
       Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto laborum reiciendis praesentium eos dignissimos nulla officiis doloremque maiores quaerat nihil recusandae expedita illo, ex maxime totam odit ab, ducimus perspiciatis aliquam sint error. Repellendus cupiditate voluptas quis harum et assumenda.
      </p>
     </div>
    </div>
   </div>
  </section>
 )
}

export default Story