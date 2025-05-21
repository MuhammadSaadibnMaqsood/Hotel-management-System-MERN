import React from 'react'
import Title from './Title'
import { testimonials } from '../assets/assets'
import StarRating from './StarRating'

const Testimonail = () => {
    return (
        <>
            <div className='flex flex-col items-center px-6 md:px-16 lg:px-24 bg-slate-100 pt-20 pb-30 mt-11'>
                <Title title={'What Our Guest Say'} subTitle={'Discover why discerning travellers consistently choose QuickStay for their exclusive and luxurious accommodation aound thw world'} />

                <div className="flex flex-wrap items-center justify-center gap-8 mt-20">
                    {testimonials.map((testimonial) => (
                        <div
                            key={testimonial.id}
                            className="bg-white hover:shadow-2xl transition duration-300 transform hover:-translate-y-2 p-6 rounded-2xl shadow-md max-w-sm w-full"
                        >
                            <div className="flex items-center gap-4">
                                <img
                                    className="w-14 h-14 rounded-full border-2 border-indigo-500"
                                    src={testimonial.image}
                                    alt={testimonial.name}
                                />
                                <div>
                                    <p className="font-playfair text-lg font-semibold">{testimonial.name}</p>
                                    <p className="text-sm text-gray-500">{testimonial.address}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-1 mt-4 text-yellow-500">
                                <StarRating />
                            </div>

                            <p className="text-gray-600 italic mt-4">
                                <span className="text-2xl text-indigo-400">“</span>{testimonial.review}
                                <span className="text-2xl text-indigo-400">”</span>
                            </p>
                        </div>
                    ))}
                </div>

            </div>


        </>
    )
}

export default Testimonail