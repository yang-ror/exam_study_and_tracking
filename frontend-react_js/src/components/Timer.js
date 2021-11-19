import React from 'react'

const Timer = ({ setTimeUsed }) => {
    const [time, setTime] = React.useState(0)
    const [seconds, setSeconds] = React.useState('0')
    const [minutes, setMinutes] = React.useState('0')
    const [hours, setHours] = React.useState('')

    React.useEffect(() => {
        function setTimer(){
            setTimeout(() => {
                setTime(time + 1)
            }, 1000)
            
            var sec = time % 60
            var min = Math.floor(time / 60) % 60
            var hr = Math.floor(time / 3600)

            setSeconds(sec < 10 ? '0' + sec : '' + sec)
            setMinutes(min < 10 ? '0' + min : '' + min)
            setHours(hr)
            setTimeUsed(time)
        }
        setTimer()
    })

    return (
        <>
            <label className='timer'>{`${hours}:${minutes}:${seconds}`}</label>
        </>
    )
}

export default Timer
