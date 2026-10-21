const formatter = new Intl.DateTimeFormat(undefined, {
    day: "numeric",
    month: "short",
    hour: "2-digit",
    minute: "2-digit",
});

type TimestampProps = {
    time: number;
};

export function Timestamp({ time }: TimestampProps) {
    const date = new Date(time * 1000);
    return <time dateTime={date.toISOString()}>{formatter.format(date)}</time>;
}
