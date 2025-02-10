import { Button } from "@/components/ui/button";

interface HeaderProps {
    onChangeGoal: () => void;
    onGiveUp: () => void;
}

const Header: React.FC<HeaderProps> = ({ onChangeGoal, onGiveUp }) => {
    return (
        <header className="fixed top-0 left-0 right-0 mb-4 p-4 bg-gray-800 rounded-md shadow-md z-10">
            <h1 className="text-2xl text-white font-bold">Wikiゴルフ</h1>
            <div className="flex items-center">
                <Button
                    className="bg-green-500 hover:bg-green-600 text-black mr-4 transition duration-300"
                    type="button"
                    onClick={onChangeGoal}
                >
                    ゴールの単語を変更
                </Button>
                <Button
                    className="bg-red-500 hover:bg-red-600 text-white transition duration-300"
                    type="button"
                    onClick={onGiveUp}
                >
                    ギブアップ
                </Button>
            </div>
        </header>
    );
};

export default Header; 