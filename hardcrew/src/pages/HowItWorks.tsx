
import { Check } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Layout from "@/components/layout/Layout";

const HowItWorks = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="bg-hardcrew-blue py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              How HardCrew Works
            </h1>
            <p className="text-xl opacity-90 mb-8">
              A simple and secure way to connect skilled workers with clients
            </p>
          </div>
        </div>
      </section>

      {/* For Workers */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">For Workers</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Showcase your skills, find jobs, and grow your business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
            {/* Step 1 */}
            <div className="text-center">
              <div className="bg-blue-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-hardcrew-blue">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Create Your Profile</h3>
              <p className="text-gray-600">
                Sign up, verify your identity, and build out your professional profile with skills, certifications, and experience.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="bg-blue-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-hardcrew-blue">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Showcase Your Work</h3>
              <p className="text-gray-600">
                Upload videos of your projects, before & after transformations, and testimonials to build credibility.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="bg-blue-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-hardcrew-blue">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Get Hired & Paid</h3>
              <p className="text-gray-600">
                Receive job requests, perform services, and get paid securely through our escrow payment system.
              </p>
            </div>
          </div>

          <div className="bg-gray-50 rounded-xl p-8 flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1">
              <h3 className="text-2xl font-bold mb-4">Worker Benefits</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="mr-3 mt-1">
                    <Check className="h-5 w-5 text-hardcrew-blue" />
                  </div>
                  <span>Get discovered by clients through video showcases</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1">
                    <Check className="h-5 w-5 text-hardcrew-blue" />
                  </div>
                  <span>Build reputation with verified reviews and ratings</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1">
                    <Check className="h-5 w-5 text-hardcrew-blue" />
                  </div>
                  <span>Access job opportunities from qualified clients</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1">
                    <Check className="h-5 w-5 text-hardcrew-blue" />
                  </div>
                  <span>Secure payment protection through escrow system</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1">
                    <Check className="h-5 w-5 text-hardcrew-blue" />
                  </div>
                  <span>Grow your business with professional tools and resources</span>
                </li>
              </ul>

              <div className="mt-8">
                <Link to="/signup">
                  <Button className="btn-primary">Join as a Worker</Button>
                </Link>
              </div>
            </div>

            <div className="flex-1">
              <img 
                src="https://images.unsplash.com/photo-1529940340007-8ef64abc360a?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                alt="Worker showcasing their skills"
                className="rounded-lg w-full object-cover"
                style={{ height: '320px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* For Employers */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">For Employers</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Find skilled and verified workers for your projects
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
            {/* Step 1 */}
            <div className="text-center">
              <div className="bg-orange-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-hardcrew-orange">1</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Create Account</h3>
              <p className="text-gray-600">
                Sign up as an employer, verify your identity, and set up your account to start hiring.
              </p>
            </div>

            {/* Step 2 */}
            <div className="text-center">
              <div className="bg-orange-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-hardcrew-orange">2</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Find Workers</h3>
              <p className="text-gray-600">
                Browse worker videos, check ratings and reviews, and find the perfect match for your project.
              </p>
            </div>

            {/* Step 3 */}
            <div className="text-center">
              <div className="bg-orange-50 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
                <span className="text-3xl font-bold text-hardcrew-orange">3</span>
              </div>
              <h3 className="text-xl font-semibold mb-3">Book & Pay Securely</h3>
              <p className="text-gray-600">
                Book services, communicate through the app, and release payment when you're satisfied.
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl p-8 flex flex-col md:flex-row gap-8 items-center">
            <div className="flex-1 order-2 md:order-1">
              <img 
                src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&q=80" 
                alt="Client hiring a worker"
                className="rounded-lg w-full object-cover"
                style={{ height: '320px' }}
              />
            </div>
            
            <div className="flex-1 order-1 md:order-2">
              <h3 className="text-2xl font-bold mb-4">Employer Benefits</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <div className="mr-3 mt-1">
                    <Check className="h-5 w-5 text-hardcrew-orange" />
                  </div>
                  <span>Watch worker videos to assess skills before hiring</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1">
                    <Check className="h-5 w-5 text-hardcrew-orange" />
                  </div>
                  <span>Verified workers with background checks and skill verification</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1">
                    <Check className="h-5 w-5 text-hardcrew-orange" />
                  </div>
                  <span>Post jobs or browse and book workers directly</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1">
                    <Check className="h-5 w-5 text-hardcrew-orange" />
                  </div>
                  <span>Secure payment system with escrow protection</span>
                </li>
                <li className="flex items-start">
                  <div className="mr-3 mt-1">
                    <Check className="h-5 w-5 text-hardcrew-orange" />
                  </div>
                  <span>In-app messaging and support for seamless communication</span>
                </li>
              </ul>

              <div className="mt-8">
                <Link to="/post-job">
                  <Button className="btn-secondary">Post a Job</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Payment Process */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Secure Payment Process</h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Our escrow payment system ensures security for both parties
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {/* Step 1 */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <span className="font-bold text-lg">1</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Client Payment</h3>
              <p className="text-gray-600">
                Client makes payment through the platform using secure methods.
              </p>
            </div>

            {/* Step 2 */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <span className="font-bold text-lg">2</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Escrow Hold</h3>
              <p className="text-gray-600">
                Funds are securely held in escrow while work is completed.
              </p>
            </div>

            {/* Step 3 */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <span className="font-bold text-lg">3</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Job Completion</h3>
              <p className="text-gray-600">
                Worker completes the job and client confirms satisfaction.
              </p>
            </div>

            {/* Step 4 */}
            <div className="bg-white rounded-lg p-6 shadow-sm border">
              <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                <span className="font-bold text-lg">4</span>
              </div>
              <h3 className="text-lg font-semibold mb-2">Payment Release</h3>
              <p className="text-gray-600">
                Funds are released to worker's account for withdrawal.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-hardcrew-blue py-16 text-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl opacity-90 mb-8">
              Join the HardCrew community today and connect with skilled professionals or find your next job.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/signup">
                <Button size="lg" className="bg-white text-hardcrew-blue hover:bg-blue-50 font-semibold">
                  Sign Up for Free
                </Button>
              </Link>
              <Link to="/contact">
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 font-semibold">
                  Contact Support
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default HowItWorks;
