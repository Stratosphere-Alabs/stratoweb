import React from "react";
import { useLanguage } from "../../LanguageContext";

const CommercialTransaction: React.FC = () => {
    const { lang } = useLanguage();

    return (
        <div className="min-h-screen bg-[#F2F2F2] pt-20">
            <div className="mx-auto max-w-4xl px-6 py-16 md:px-10">
                <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
                    {lang === "ja" ? (
                        <>
                            <h1 className="text-4xl font-bold text-slate-900 mb-8">特定商取引法に基づく表記</h1>

                            <div className="prose prose-slate max-w-none space-y-6 text-slate-700">
                                <p className="text-sm text-slate-500">
                                    特定商取引に関する法律に基づき、以下の通り表示いたします。
                                </p>

                                <div className="space-y-6 mt-8">
                                    <div className="border-b border-slate-200 pb-4">
                                        <h3 className="text-lg font-bold text-slate-900 mb-2">販売事業者</h3>
                                        <p>Stratoflow株式会社</p>
                                    </div>

                                    <div className="border-b border-slate-200 pb-4">
                                        <h3 className="text-lg font-bold text-slate-900 mb-2">運営統括責任者</h3>
                                        <p>代表取締役 WANG YUXIANG</p>
                                    </div>

                                    <div className="border-b border-slate-200 pb-4">
                                        <h3 className="text-lg font-bold text-slate-900 mb-2">所在地</h3>
                                        <p>〒533-0005</p>
                                        <p>大阪府大阪市東淀川区瑞光１−２−１１−４０１</p>
                                    </div>

                                    <div className="border-b border-slate-200 pb-4">
                                        <h3 className="text-lg font-bold text-slate-900 mb-2">メールアドレス</h3>
                                        <p>info@stratoflow.ai</p>
                                    </div>

                                    <div className="border-b border-slate-200 pb-4">
                                        <h3 className="text-lg font-bold text-slate-900 mb-2">ウェブサイトURL</h3>
                                        <p>https://stratoflow.com</p>
                                    </div>

                                    <div className="border-b border-slate-200 pb-4">
                                        <h3 className="text-lg font-bold text-slate-900 mb-2">販売価格</h3>
                                        <p>サービスごとの料金は、各サービスページおよび料金ページに記載の通りです。</p>
                                        <p className="mt-2">価格は全て税込表示です。</p>
                                    </div>

                                    <div className="border-b border-slate-200 pb-4">
                                        <h3 className="text-lg font-bold text-slate-900 mb-2">商品等の引渡時期</h3>
                                        <p>サービスは、お客様のアカウント登録完了後、即時利用可能となります。</p>
                                    </div>

                                    <div className="border-b border-slate-200 pb-4">
                                        <h3 className="text-lg font-bold text-slate-900 mb-2">支払方法</h3>
                                        <ul className="list-disc list-inside space-y-1 ml-4">
                                            <li>クレジットカード決済（Visa、Mastercard、JCB、American Express）</li>
                                            <li>銀行振込（法人契約の場合）</li>
                                            <li>その他、当社が指定する支払方法</li>
                                        </ul>
                                    </div>

                                    <div className="border-b border-slate-200 pb-4">
                                        <h3 className="text-lg font-bold text-slate-900 mb-2">支払時期</h3>
                                        <p>クレジットカード決済：毎月末日締め、翌月のカード会社指定日</p>
                                        <p>銀行振込：請求書発行後30日以内</p>
                                    </div>

                                    <div className="border-b border-slate-200 pb-4">
                                        <h3 className="text-lg font-bold text-slate-900 mb-2">返品・キャンセルについて</h3>
                                        <p>
                                            本サービスはデジタルコンテンツおよびオンラインサービスであるため、
                                            原則として返品・返金には応じかねます。
                                        </p>
                                        <p className="mt-2">
                                            ただし、当社の責に帰すべき事由により、契約内容と異なるサービスが提供された場合は、
                                            この限りではありません。
                                        </p>
                                    </div>

                                    <div className="border-b border-slate-200 pb-4">
                                        <h3 className="text-lg font-bold text-slate-900 mb-2">不良品について</h3>
                                        <p>
                                            サービスに不具合が生じた場合は、速やかに当社までご連絡ください。
                                            当社にて調査の上、適切に対応いたします。
                                        </p>
                                    </div>

                                    <div className="border-b border-slate-200 pb-4">
                                        <h3 className="text-lg font-bold text-slate-900 mb-2">その他費用</h3>
                                        <p>
                                            インターネット接続料金、通信料金等は、お客様のご負担となります。
                                        </p>
                                    </div>

                                    <div className="border-b border-slate-200 pb-4">
                                        <h3 className="text-lg font-bold text-slate-900 mb-2">サービス提供期間</h3>
                                        <p>
                                            サービスは、お客様がアカウントを保有し、利用規約に同意している間、継続的に提供されます。
                                        </p>
                                    </div>

                                    <div className="border-b border-slate-200 pb-4">
                                        <h3 className="text-lg font-bold text-slate-900 mb-2">動作環境</h3>
                                        <p className="mb-2">本サービスの推奨動作環境は以下の通りです：</p>
                                        <ul className="list-disc list-inside space-y-1 ml-4">
                                            <li>ブラウザ: Chrome、Safari、Firefox、Edge（最新版推奨）</li>
                                            <li>インターネット接続環境</li>
                                            <li>API利用の場合: HTTPS対応環境</li>
                                        </ul>
                                    </div>

                                    <div>
                                        <h3 className="text-lg font-bold text-slate-900 mb-2">お問い合わせ</h3>
                                        <div className="bg-slate-50 p-4 rounded-lg">
                                            <p className="font-semibold">Stratoflow株式会社 カスタマーサポート</p>
                                            <p className="mt-2">〒533-0005</p>
                                            <p>大阪府大阪市東淀川区瑞光１−２−１１−４０１</p>
                                            <p className="mt-2">Email: info@stratoflow.ai</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </>
                    ) : (
                        <>
                            <h1 className="text-4xl font-bold text-slate-900 mb-8">
                                Commercial Transaction Act Disclosure
                            </h1>

                            <div className="prose prose-slate max-w-none space-y-6 text-slate-700">
                                <p className="text-sm text-slate-500">
                                    Information required under the Act on Specified Commercial Transactions
                                </p>

                                <div className="space-y-6 mt-8">
                                    <div className="border-b border-slate-200 pb-4">
                                        <h3 className="text-lg font-bold text-slate-900 mb-2">Business Operator</h3>
                                        <p>Stratoflow Inc.</p>
                                    </div>

                                    <div className="border-b border-slate-200 pb-4">
                                        <h3 className="text-lg font-bold text-slate-900 mb-2">Representative</h3>
                                        <p>CEO WANG YUXIANG</p>
                                    </div>

                                    <div className="border-b border-slate-200 pb-4">
                                        <h3 className="text-lg font-bold text-slate-900 mb-2">Address</h3>
                                        <p>〒533-0005</p>
                                        <p>1-2-11-401 Zuiko, Higashiyodogawa-ku</p>
                                        <p>Osaka-shi, Osaka, Japan</p>
                                    </div>

                                    <div className="border-b border-slate-200 pb-4">
                                        <h3 className="text-lg font-bold text-slate-900 mb-2">Contact</h3>
                                        <p>Email: info@stratoflow.ai</p>
                                    </div>

                                    <div className="border-b border-slate-200 pb-4">
                                        <h3 className="text-lg font-bold text-slate-900 mb-2">Pricing</h3>
                                        <p>
                                            Prices for each service are listed on the respective service and pricing pages.
                                            All prices include tax.
                                        </p>
                                    </div>

                                    <div className="border-b border-slate-200 pb-4">
                                        <h3 className="text-lg font-bold text-slate-900 mb-2">Payment Methods</h3>
                                        <ul className="list-disc list-inside space-y-1 ml-4">
                                            <li>Credit Card (Visa, Mastercard, JCB, American Express)</li>
                                            <li>Bank Transfer (for corporate contracts)</li>
                                        </ul>
                                    </div>

                                    <div className="border-b border-slate-200 pb-4">
                                        <h3 className="text-lg font-bold text-slate-900 mb-2">Returns and Refunds</h3>
                                        <p>
                                            As this is a digital service, returns and refunds are generally not available.
                                            Exceptions may be made in cases where the service provided differs from
                                            what was contracted due to our fault.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default CommercialTransaction;
