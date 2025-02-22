import { MessageCircle, Users, Heart, Accessibility } from "lucide-react"

const features = [
  {
    icon: <MessageCircle className="w-12 h-12 text-blue-500" />,
    title: "Seamless Communication",
    description: "Chat effortlessly with text, voice, and video options tailored for all abilities.",
  },
  {
    icon: <Users className="w-12 h-12 text-blue-500" />,
    title: "Inclusive Community",
    description: "Connect with a diverse community of individuals, fostering understanding and friendship.",
  },
  {
    icon: <Accessibility className="w-12 h-12 text-blue-500" />,
    title: "Accessibility First",
    description: "Designed with accessibility in mind, ensuring everyone can use the app comfortably.",
  },
  {
    icon: <Heart className="w-12 h-12 text-blue-500" />,
    title: "Supportive Environment",
    description: "A safe space for sharing experiences, seeking advice, and offering support.",
  },
]

export default function Features() {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">Why Choose Inclusive Connect?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-6 rounded-lg shadow-md">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

