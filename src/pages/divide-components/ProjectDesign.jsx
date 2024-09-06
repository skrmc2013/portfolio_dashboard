import React from 'react'

const ProjectDesign = ({ title, childern }) => {
    return (
        <>
            <div className='flex justify-center items-center min-h-[100vh] sm:gap-4 sm:py-4 sm:pl-14' >
                <div className='w-[100%] px-5 md:w-[650px]'>
                    {/* <form onSubmit={handleAddProject} className='w-[100%] px-5 md:w-[650px]'> */}
                    <div className='space-y-12' >
                        <div className='border-b border-gray-900/10 pb-12' >
                            <h2 className='font-semibold leading-7 text-gray-900 text-3xl text-center' >
                                {title}
                            </h2>
                            {childern}

                        </div>
                    </div>

                    {/* </form> */}
                </div>
            </div>
        </>
    )
}

export default ProjectDesign