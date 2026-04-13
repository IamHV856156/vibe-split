import { Card, CardContent, CardHeader, CardTitle } from "../card"

const StatCard = ({title,value,icon}) => {
    return(
        <Card className="bg-white/5 border-white/10 backdrop-blur-xl rounded-2xl shadow-lg hover:shadow-xl transition">
            <CardHeader className="flex items-center justify-between p-4">
                <CardTitle className="text-xl text-gray-400">{title}</CardTitle>
                <div className="text-white bg-white/10 p-3 rounded-xl">{icon}</div>
            </CardHeader>
            <CardContent >
                <div className="text-2xl text-white font-bold ">{value}</div>
            </CardContent>
        </Card>
    );
};

export default StatCard;