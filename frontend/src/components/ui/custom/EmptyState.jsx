import { Button } from "../button";
import { Card, CardContent } from "../card";

const EmptyState = ({title,description,actionLabel,onAction}) => {
    return(
        <Card className="rounded-2xl border-dashed">
            <CardContent className="py-12 text-center">
                <p className="text-gray-500">{title}</p>
                <p className="text-sm text-gray-400 mt-1">{description}</p>
                <Button onClick={onAction} className="rounded-xl">{actionLabel}</Button>
            </CardContent>
        </Card>
    );
};

export default EmptyState;