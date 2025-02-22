// import Image from "next/image"

export default function CallToAction() {
  return (
    <section className="bg-blue-600 text-white py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Connect?</h2>
        <p className="text-xl mb-8">Join our inclusive community and start making meaningful connections today.</p>
        <a
          href="#"
          className="bg-white text-blue-600 px-8 py-3 rounded-full font-semibold text-lg hover:bg-blue-100 transition duration-300"
        >
          Get Started
        </a>
      </div>
      
    </section>
  )
}