export default function TasklistCounter(props:{count: number}) {
    return (
        <div>
            {
                (props.count === 0) ? 'No tasks pending' :
                (props.count === 1) ? '1 task pending' :
                `${props.count} tasks pending`
            }
        </div>
    )
}