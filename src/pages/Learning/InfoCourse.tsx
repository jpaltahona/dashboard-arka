function InfoCourse({data}:any) {
    return (
        <div className='mt-8'>
            { data && <>
                <div className='w-full h-[200px] mb-4'>
                    <img className='w-full h-full object-cover rounded-lg' src={data.image} />
                </div>
                <div>
                    <div className='flex gap-2 mb-2'>
                        <div className='bg-[#2fc01c] text-[#fff] px-2 rounded-md'>
                            {data.type}
                        </div>
                        { data.lenguages.map((i:string) => 
                         <div className='bg-[#094609] text-[#fff] px-2 rounded-md'>
                         {i}
                        </div>
                         ) }
                    </div>
                    <h2 className='text-[20px] font-bold mb-3'> {data.title}</h2>
                    <p className='text-[16px] font-medium mb-3'>{data.description}</p>
                </div>
            </>  }
        </div>
    )
}

export default InfoCourse
