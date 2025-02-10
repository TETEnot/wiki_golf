'use client';

import Image from "next/image";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { CardContent, Card } from "@/components/ui/card";
import { useEffect, useState, ChangeEvent } from "react";
import Header from "@/components/Header"; // ヘッダーコンポーネントをインポート

export default function Home() {
    const searchUrl = 'https://ja.wikipedia.org/w/api.php?origin=*&action=query&prop=links&format=json&list=backlinks&bllimit=50&bltitle=';
    const [text, setText] = useState("");
    const [inputValue, setInputValue] = useState<string>("");
    const [isGoalSet, setIsGoalSet] = useState<boolean>(false);
    const [isShotSet, setIsShotSet] = useState<boolean>(false);
    const [goal, setGoal] = useState<string>("");
    const [shotHistory, setShotHistory] = useState<string[]>([]);
    const [goalAchieved, setGoalAchieved] = useState<boolean>(false);
    const [listWiki, setListWiki] = useState<JSX.Element[]>([]);

    const handleGoalSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim() === '') {
            alert('ゴールを入力してください。');
            return;
        }
        setGoal(inputValue);
        setIsGoalSet(true); // ゴールを確定
        setInputValue(''); // 入力フィールドをクリア
    };

    const handleShotSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (inputValue.trim() === '') {
            alert('ショットを入力してください。');
            return;
        }
        setShotHistory((prevHistory) => [...prevHistory, inputValue]); // ショット履歴に追加
        setIsShotSet(true); // ショットを確定
        setInputValue(''); // 入力フィールドをクリア

        // ここで関連単語を取得するためのAPIリクエストを行う
        fetchRelatedWords(inputValue);
    };

    const fetchRelatedWords = async (shotWord: string) => {
        const URL = searchUrl + shotWord;
        const wikiPedia: any = await fetch(URL, {
            method: 'GET',
        }).then((response) => {
            return response.json();
        }).catch(() => {
            alert("wikipediaにアクセスできません");
        });

        if (!wikiPedia || !wikiPedia.query || !wikiPedia.query.backlinks) {
            alert("エラーが出ました。");
            return;
        }

        const wikipedias: any = wikiPedia.query.backlinks;

        if (!Array.isArray(wikipedias)) {
            alert("関連単語が見つかりませんでした。");
            return;
        }

        // 「:」を含む単語を除外
        const filteredWikipedias = wikipedias.filter((wiki: any) => !wiki.title.includes(':'));

        setListWiki(filteredWikipedias.map((wiki: any) => (
            <li key={wiki.pageid}>
                <button type="button" onClick={() => handleShotButtonClick(wiki.title)}>
                    {wiki.title}
                </button>
            </li>
        )));
    };

    const handleShotButtonClick = (wikiTitle: string) => {
        setText(wikiTitle);
        setShotHistory((prevHistory) => [...prevHistory, wikiTitle]); // 選択した単語を履歴に追加
        if (wikiTitle === goal) {
            setGoalAchieved(true); // ゴール達成
        }
    };

    const fetchRandomWord = async () => {
        const URL = "https://ja.wikipedia.org/w/api.php?origin=*&action=query&list=random&rnlimit=1&format=json";
        let randomWord = "";
        let isValidWord = false;

        while (!isValidWord) {
            const response = await fetch(URL);
            const data = await response.json();
            randomWord = data.query.random[0].title; // ランダムな単語を取得

            // 「:」を含まない単語かどうかをチェック
            if (!randomWord.includes(':')) {
                isValidWord = true; // 有効な単語が見つかった
            }
        }

        if (!isGoalSet) {
            setInputValue(randomWord); // ゴールの単語を設定
        } else {
            setInputValue(randomWord); // スタートの単語を設定
        }
    };

    useEffect(() => {
        async function fetchTodos() {
            if (!text) {
                return;
            }

            const URL = searchUrl + text;
            const wikiPedia: any = await fetch(URL, {
                method: 'GET',
            }).then((response) => {
                return response.json();
            }).catch(() => {
                alert("wikipediaにアクセスできません");
            });

            if (!wikiPedia || !wikiPedia.query || !wikiPedia.query.backlinks) {
                alert("エラーが出ました。");
                return;
            }

            const wikipedias: any = wikiPedia.query.backlinks;

            if (!Array.isArray(wikipedias)) {
                alert("関連単語が見つかりませんでした。");
                return;
            }

            setListWiki(wikipedias.map((wiki: any) => (
                <li key={wiki.pageid}>
                    <button type="button" onClick={() => handleShotButtonClick(wiki.title)}>
                        {wiki.title}
                    </button>
                </li>
            )));
        }
        fetchTodos();
    }, [text]);

    return (
        <>
            <section className="w-full py-24 bg-black min-h-screen pt-32">
                <div className="container mx-auto max-w-4xl px-4 md:px-6">
                    <Header
                        onChangeGoal={() => {
                            setIsGoalSet(false);
                            setInputValue(goal);
                        }}
                        onGiveUp={() => window.location.reload()}
                    />
                    <div className="flex flex-col items-center gap-8">
                        <div className="flex flex-col justify-center space-y-4 w-full">
                            <div className="space-y-2 w-full">
                                {!isGoalSet && (
                                    <form onSubmit={handleGoalSubmit}>
                                        <div className="flex items-center mb-4">
                                            <input
                                                className="block p-2.5 w-full z-20 text-sm text-white bg-gray-800 rounded-l-md border border-gray-600 focus:ring-green-500 focus:border-green-500"
                                                type="text"
                                                value={inputValue}
                                                onChange={(e) => setInputValue(e.target.value)}
                                                placeholder="ゴールを入力"
                                            />
                                            <Button
                                                className="bg-green-500 hover:bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center ml-2 transition duration-300 shadow-lg"
                                                type="button"
                                                onClick={fetchRandomWord}
                                            >
                                                <span>🎲</span>
                                            </Button>
                                            <Button
                                                className="bg-green-600 hover:bg-green-700 text-white ml-2 transition duration-300 shadow-lg"
                                                type="submit"
                                            >
                                                決定
                                            </Button>
                                        </div>
                                    </form>
                                )}

                                {isGoalSet && (
                                    <div className="flex items-center justify-between bg-gray-800 p-4 rounded-md shadow-md">
                                        <p className="text-lg text-yellow-400 font-bold">ゴール: {goal}</p>
                                    </div>
                                )}

                                {!isShotSet && isGoalSet && (
                                    <form onSubmit={handleShotSubmit}>
                                        <div className="flex items-center mb-4">
                                            <input
                                                className="block p-2.5 w-full z-20 text-sm text-white bg-gray-800 rounded-l-md border border-gray-600 focus:ring-green-500 focus:border-green-500"
                                                type="text"
                                                value={inputValue}
                                                onChange={(e) => setInputValue(e.target.value)}
                                                placeholder="ショットを入力"
                                            />
                                            <Button
                                                className="bg-green-500 hover:bg-green-600 text-white rounded-full w-10 h-10 flex items-center justify-center ml-2 transition duration-300 shadow-lg"
                                                type="button"
                                                onClick={fetchRandomWord}
                                            >
                                                <span>🎲</span>
                                            </Button>
                                            <Button
                                                className="bg-green-600 hover:bg-green-700 text-white ml-2 transition duration-300 shadow-lg"
                                                type="submit"
                                            >
                                                ショット
                                            </Button>
                                            
                                        </div>
                                    </form>
                                )}

                                {goalAchieved && (
                                    <div className="mt-4 p-4 bg-green-600 text-white rounded-md shadow-md">
                                        <p className="text-lg font-bold">おめでとうございます！ゴールを達成しました！</p>
                                    </div>
                                )}

                                <div className="mt-4">
                                    <h2 className="text-lg text-white mb-2">ショット履歴</h2>
                                    <div className="bg-gray-800 p-4 rounded-md shadow-md">
                                        {shotHistory.length > 0 ? (
                                            <ul className="list-disc list-inside text-white">
                                                {shotHistory.map((shot, index) => (
                                                    <li key={index} className="py-1">
                                                        <span className="text-yellow-400 font-bold">{index + 1}.</span> {shot}
                                                    </li>
                                                ))}
                                            </ul>
                                        ) : (
                                            <p className="text-gray-400">履歴はありません。</p>
                                        )}
                                    </div>
                                </div>

                                <ul className="mt-4 text-lg text-white bg-gray-800 p-4 rounded-md">
                                    {listWiki}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}