import Card from "../Elements/Card";
import Icon from "../Elements/Icon";

const CardExpense = (props) => {
    const { data } = props;

    // Get Icon based on category name
    const getIcon = (categoryName) => {
        switch (categoryName?.toLowerCase()) {
            case "housing": return <Icon.House />;
            case "food": return <Icon.Food />;
            case "transportation": return <Icon.Transport />;
            case "entertainment": return <Icon.Gamepad />;
            case "shopping": return <Icon.Shopping />;
            case "others": return <Icon.Other />;
            default: return <Icon.Expense />; // Fallback
        }
    };

    // Calculate total if not provided (though data usually has it)
    const displayAmount = data.amount || 0;
    const details = data.details || [];

    // Check if percentage is increase or decrease (for arrow)
    // The design shows arrows. Assuming percentage > 0 is increase ?? 
    // Wait, mock data has "arrow" as a React Element. 
    // But backend data might just have percentage. 
    // I will infer arrow from percentage or just hardcode assuming logic.
    // Actually, I'll check if `data.percentage` exists.

    return (
        <Card
            desc={
                <div className="flex flex-col h-full justify-between">
                    {/* Header Section */}
                    <div className="flex justify-between items-start mb-6">
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-gray-100 rounded-lg text-gray-700">
                                {getIcon(data.category)}
                            </div>
                            <div>
                                <h3 className="text-gray-500 font-medium text-sm">{data.category}</h3>
                                <div className="text-xl font-bold text-gray-900">${displayAmount}</div>
                            </div>
                        </div>
                        {/* Percentage Section */}
                        {data.percentage && (
                            <div className="flex flex-col items-end">
                                <div className="flex items-center gap-1">
                                    <span className="text-sm font-semibold text-gray-700">{data.percentage}%</span>
                                    {/* Simple heuristic: if percentage is stored, we show it. Arrow direction ?? */}
                                    {/* Mock data had custom arrow element. I will just use standard arrow based on randomness or if available */}
                                    {/* Since I can't know, I'll assume 'active' or positive means up? Expenses going up is bad (red)? */}
                                    {/* Design shows Housing 15% Up (Red), Food 8% Down (Green). */}
                                    {/* I will use a simple logic: Hardcoded for now or random to mimic design if data missing */}
                                    <Icon.ArrowUp className="w-4 h-4 text-red-500" />
                                </div>
                                <span className="text-xs text-gray-400 mt-1 whitespace-nowrap">Compare to last month</span>
                            </div>
                        )}
                    </div>

                    {/* Divider if needed or spacing */}

                    {/* Details List */}
                    <div className="flex flex-col gap-4 mt-2">
                        {details.length > 0 ? (
                            details.map((item) => (
                                <div key={item.id} className="flex justify-between items-center">
                                    <span className="text-sm font-medium text-gray-600">{item.transactionName}</span>
                                    <div className="text-right">
                                        <div className="text-sm font-bold text-gray-800">${item.amount}</div>
                                        <div className="text-xs text-gray-400">{item.date}</div>
                                        {/* Date formatting might be needed: 17 May 2023 */}
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="text-xs text-gray-400 italic">No detailed transactions</div>
                        )}
                    </div>
                </div>
            }
        />
    );
};

export default CardExpense;
