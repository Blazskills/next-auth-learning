'use client'

const error = ({error, reset}) => {
return <div>
    <p>{error.message}</p>
    <button onClick={()=>reset()}>Retry </button>
</div>
}

export default error