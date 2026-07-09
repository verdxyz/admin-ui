import React from "react";
import Card from "../Elements/Card";
import Icon from "../Elements/Icon";
import CompositionExample from "../Elements/CompositionExample";

const CardGoal = ({ data }) => {
    if (!data) return null;

    // Use optional chaining and default to 0 if values are undefined
    const targetAmount = data.targetAmount ?? 0;
    const presentAmount = data.presentAmount ?? 0;

    const progress =
        targetAmount > 0
            ? (presentAmount / targetAmount) * 100
            : 0;

    return (
        <Card
            title="Goals"
            desc={
                <div className="p-2">
                    {/* Header */}
                    <div className="flex justify-between items-center mb-4">
                        <div className="flex items-center gap-2">
                            <p className="text-2xl font-bold">
                                ${targetAmount.toLocaleString()}
                            </p>
                            <div className="p-1 bg-gray-100 rounded cursor-pointer transition hover:bg-gray-200">
                                <Icon.Edit size={16} />
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm">May, 2023</p>
                    </div>

                    {/* Content */}
                    <div className="flex justify-between items-center mt-6">
                        <div className="space-y-5">
                            <div className="flex items-start gap-3">
                                <div className="text-gray-400 mt-1">
                                    <Icon.Award size={20} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">Target Achieved</p>
                                    <p className="text-sm font-bold">
                                        ${presentAmount.toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <div className="text-gray-400 mt-1">
                                    <Icon.Target size={20} />
                                </div>
                                <div>
                                    <p className="text-xs text-gray-400">This Month Target</p>
                                    <p className="text-sm font-bold">
                                        ${targetAmount.toLocaleString()}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Progress */}
                        <div className="flex flex-col items-center">
                            <CompositionExample data={progress} />
                            <p className="text-[10px] text-gray-400 mt-1 italic">
                                Target vs Achievement
                            </p>
                        </div>
                    </div>
                </div>
            }
        />
    );
};

export default CardGoal;