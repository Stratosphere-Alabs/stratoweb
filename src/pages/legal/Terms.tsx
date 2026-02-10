import React from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../LanguageContext";

const Terms: React.FC = () => {
    const { lang } = useLanguage();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#F2F2F2] pt-20">
            <div className="mx-auto max-w-4xl px-6 py-16 md:px-10">
                {/* Back Button */}
                <button
                    onClick={() => navigate(-1)}
                    className="mb-6 inline-flex items-center gap-2 text-slate-600 hover:text-slate-900 transition-colors group"
                >
                    <svg className="w-5 h-5 transition-transform group-hover:-translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    <span className="text-sm font-medium">
                        {lang === "ja" ? "戻る" : "Back"}
                    </span>
                </button>

                <div className="bg-white rounded-3xl shadow-lg p-8 md:p-12">
                    {lang === "ja" ? (
                        <>
                            <h1 className="text-4xl font-bold text-slate-900 mb-8 tracking-tight">利用規約</h1>

                            <div className="prose prose-slate max-w-none space-y-8 text-slate-700">
                                <section>
                                    <p className="text-sm text-slate-500">最終更新日：2025年10月7日</p>
                                    <p className="mt-4 leading-relaxed">
                                        本利用規約（以下「本規約」といいます。）は、Stratoflow株式会社（英文表記：Stratoflow Inc.、以下「当社」といいます。）と、本規約に同意のうえ当社が提供するプラットフォームおよび関連サービス（以下総称して「本サービス」といいます。）を利用するお客様（以下「ユーザー」といいます。）との間に成立する、法的拘束を有する契約です。<br />
                                        本規約は、当社のプライバシーポリシーおよび当社が別途定め、公開する各種ポリシー・個別利用条件等と併せて、ユーザーによる本サービスの利用に関する一切の法的枠組みを構成します。<br />
                                        ユーザーが本プラットフォームにアクセスし、または本サービスを利用した場合、ユーザーは、本規約および関連ポリシーの内容を理解し、これらに拘束されることに同意したものとみなされます。<br />
                                        日本法その他適用法令上、契約を締結する法的能力を有しない場合、または本規約に同意できない場合には、本サービスを利用することはできません。<br />
                                        当社は、必要に応じて本規約を改定し、または新たなポリシーを制定することがあります。改定後の規約は、本プラットフォーム上での掲示、電子メールその他合理的な方法により通知されます。改定後も本サービスの利用を継続した場合、ユーザーは当該改定内容に同意したものとみなされます。
                                    </p>
                                </section>

                                <hr className="border-slate-100" />

                                <section>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-4">第1条（定義）</h2>
                                    <p className="mb-4">本規約において、以下の用語はそれぞれ次の意味を有します。</p>
                                    <ol className="list-decimal list-inside space-y-2 ml-4 text-slate-600">
                                        <li>「アカウント」とは、本プラットフォームを利用するために登録されたユーザーアカウントをいいます。</li>
                                        <li>「関連会社」とは、ある当事者を支配する、当事者に支配される、または当事者と共通の支配下にある法人その他の団体をいいます。</li>
                                        <li>「プラットフォーム」とは、本サービスを提供するための当社のウェブサイト、APIおよび関連ソフトウェアシステムをいいます。</li>
                                        <li>「本サービス」とは、当社または当社の提携先が提供するクラウドコンピューティング、分散推論、モデルホスティングその他関連するサービスをいいます。</li>
                                        <li>「ドキュメント」とは、本プラットフォームまたは本サービスの利用方法や機能を説明する公式資料をいいます。</li>
                                        <li>「インタラクションデータ」とは、本サービスを通じてユーザーが入力、送信、処理し、または生成される一切のデータ（第三者提供資料を除きます。）をいいます。</li>
                                        <li>「個人情報」とは、日本の個人情報保護法（APPI）に定義される、特定の個人を識別できる情報をいいます。</li>
                                        <li>「第三者決済事業者」とは、Stripe、Pay.jp等、当社に代わり決済処理を行う外部事業者をいいます。</li>
                                        <li>「法令等」とは、日本法を含む、適用されるすべての法律、政令、省令、条例およびガイドラインをいいます。</li>
                                        <li>「アップデート」とは、本プラットフォームまたは本サービスに対する修正、改善、機能追加等をいいます。</li>
                                        <li>「不可抗力事由」とは、天災地変、戦争、通信障害その他当社の合理的支配を超える事由をいいます。</li>
                                    </ol>
                                </section>

                                <hr className="border-slate-100" />

                                <section>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-4">第2条（利用許諾）</h2>
                                    <div className="space-y-4">
                                        <div>
                                            <h4 className="font-bold mb-1">1. 利用権の付与</h4>
                                            <p className="text-sm">当社は、本規約に従うことを条件として、ユーザーに対し、本契約期間中に限り、本プラットフォームおよび本サービスを利用するための、非独占的、譲渡不能、再許諾不可、取消可能な利用権を付与します。</p>
                                        </div>
                                        <div>
                                            <h4 className="font-bold mb-1">2. 権利帰属</h4>
                                            <p className="text-sm">本プラットフォーム、本サービスおよびドキュメントに関する知的財産権は、すべて当社または正当な権利者に帰属します。本規約に明示的に定める場合を除き、ユーザーにはいかなる権利も移転されません。</p>
                                        </div>
                                        <div>
                                            <h4 className="font-bold mb-1">3. 商標</h4>
                                            <p className="text-sm">「Stratoflow」「Stratoflow Intelligence」および関連ロゴは、当社の登録商標または未登録商標です。無断使用を禁止します。</p>
                                        </div>
                                    </div>
                                </section>

                                <hr className="border-slate-100" />

                                <section>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-4">第3条（ユーザーの義務および禁止事項）</h2>
                                    <div className="space-y-4">
                                        <p>1. ユーザーは、本規約、プライバシーポリシーおよび法令等を遵守して本サービスを利用するものとします。</p>
                                        <p>2. ユーザーは、以下の行為を行ってはなりません。</p>
                                        <ul className="list-disc list-inside space-y-1 ml-4 text-slate-600">
                                            <li>違法行為または第三者の知的財産権等を侵害する行為</li>
                                            <li>有害、誹謗中傷的または不適切な情報の送信</li>
                                            <li>本プラットフォームの解析、リバースエンジニアリング、妨害行為</li>
                                            <li>アクセス制御または決済制御の回避</li>
                                            <li>当社の書面による事前承諾なく、本サービス上のコンテンツを用いて機械学習モデルの学習・開発を行う行為</li>
                                        </ul>
                                        <p>3. 当社は、本規約または法令等に違反した場合、ユーザーの利用を停止または終了させることができます。</p>
                                    </div>
                                </section>

                                <hr className="border-slate-100" />

                                <section>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-4">第4条（サービス提供）</h2>
                                    <div className="space-y-4">
                                        <p>1. 当社は、本サービスの安定的な提供に合理的な努力を行います。</p>
                                        <p>2. ただし、以下の場合には、本サービスの全部または一部を停止することがあります。</p>
                                        <ul className="list-disc list-inside space-y-1 ml-4 text-slate-600">
                                            <li>保守、点検、アップデート</li>
                                            <li>不可抗力事由</li>
                                            <li>電気通信関連法令の変更</li>
                                            <li>外部通信事業者等の障害</li>
                                        </ul>
                                        <p>3. 当社は、これらによる損害について責任を負いません。</p>
                                    </div>
                                </section>

                                <hr className="border-slate-100" />

                                <section>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-4">第5条（アカウント）</h2>
                                    <ol className="list-decimal list-inside space-y-2 ml-4 text-slate-600">
                                        <li>一部機能の利用には、アカウント登録（Google、GitHub等の外部認証を含む）が必要です。</li>
                                        <li>ユーザーは、登録情報の正確性を保持し、認証情報を適切に管理するものとします。</li>
                                        <li>アカウントを通じて行われた一切の行為について、ユーザーは責任を負います。</li>
                                        <li>当社は、法令遵守、不正行為防止等のため、事前通知なくアカウントを停止または削除することがあります。</li>
                                    </ol>
                                </section>

                                <hr className="border-slate-100" />

                                <section>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-4">第6条（料金および支払）</h2>
                                    <ol className="list-decimal list-inside space-y-2 ml-4 text-slate-600">
                                        <li>利用料金は、購入前に表示されます。</li>
                                        <li>支払は第三者決済事業者を通じて行われ、当社は決済情報を直接保持しません。</li>
                                        <li>決済に関する責任は、ユーザーと当該決済事業者との契約に基づきます。</li>
                                        <li>法令で定められる場合を除き、料金は返金されません。</li>
                                        <li>税金および為替手数料はユーザーの負担とします。</li>
                                    </ol>
                                </section>

                                <hr className="border-slate-100" />

                                <section>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-4">第7条（インタラクションデータ）</h2>
                                    <ol className="list-decimal list-inside space-y-2 ml-4 text-slate-600">
                                        <li>ユーザーは、自己のインタラクションデータの権利を保持します。</li>
                                        <li>ユーザーは、当該データが法令等に違反しないことを保証します。</li>
                                        <li>当社は、技術提供、法令対応等の目的に限り、APPIを遵守して当該データを取り扱います。</li>
                                    </ol>
                                </section>

                                <hr className="border-slate-100" />

                                <section>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-4">第8条（第三者ソフトウェア）</h2>
                                    <p>本サービスには第三者ソフトウェアまたはオープンソースが含まれる場合があり、当該利用条件が適用されます。</p>
                                </section>

                                <hr className="border-slate-100" />

                                <section>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-4">第9条（免責および責任制限）</h2>
                                    <ol className="list-decimal list-inside space-y-2 ml-4 text-slate-600">
                                        <li>本サービスは「現状有姿」で提供されます。</li>
                                        <li>当社は、逸失利益、間接損害等について責任を負いません。</li>
                                        <li>当社の責任は、過去12か月間にユーザーが支払った対価を上限とします。</li>
                                        <li>日本法上免責できない責任については、この限りではありません。</li>
                                    </ol>
                                </section>

                                <hr className="border-slate-100" />

                                <section>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-4">第10条（知的財産権）</h2>
                                    <p>ユーザーは、当社が本サービス提供に必要な範囲でインタラクションデータを処理・保存することを許諾します。</p>
                                </section>

                                <hr className="border-slate-100" />

                                <section>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-4">第11条（フィードバック）</h2>
                                    <p>ユーザーから提供された提案等は、無償で利用できるものとします。</p>
                                </section>

                                <hr className="border-slate-100" />

                                <section>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-4">第12条（契約期間および終了）</h2>
                                    <p>本規約は、終了されるまで有効とします。</p>
                                </section>

                                <hr className="border-slate-100" />

                                <section>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-4">第13条（準拠法および管轄）</h2>
                                    <p>本規約は日本法を準拠法とし、大阪地方裁判所を第一審の専属的合意管轄裁判所とします。</p>
                                </section>

                                <hr className="border-slate-100" />

                                <section>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-4">第14条（雑則）</h2>
                                    <ol className="list-decimal list-inside space-y-2 ml-4 text-slate-600">
                                        <li>本規約は、提携関係を構成するものではありません。</li>
                                        <li>一部条項が無効となっても、他の条項は有効に存続します。</li>
                                        <li>本規約は英語で作成され、日本語訳は参考のために提供されます。</li>
                                    </ol>
                                </section>

                                <hr className="border-slate-100" />

                                <section>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-4">お問い合わせ先</h2>
                                    <div className="bg-slate-50 p-6 rounded-2xl space-y-2">
                                        <p className="text-lg font-semibold">Stratoflow株式会社</p>
                                        <p className="text-slate-600">所在地：大阪府</p>
                                        <p className="text-blue-600 font-medium">Email：info@stratoflow.ai</p>
                                    </div>
                                </section>
                            </div>
                        </>
                    ) : (
                        <>
                            <h1 className="text-4xl font-bold text-slate-900 mb-8">Terms of Use</h1>

                            <div className="prose prose-slate max-w-none space-y-6 text-slate-700">
                                <p className="text-sm text-slate-500">Last Updated: January 16, 2026</p>

                                <section>
                                    <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Article 1 (Application)</h2>
                                    <ol className="list-decimal list-inside space-y-2 ml-4">
                                        <li>
                                            These Terms of Use ("Terms") set forth the conditions for using the Stratoflow
                                            AI platform service ("Service") provided by Stratoflow Inc. ("Company").
                                        </li>
                                        <li>By using the Service, you agree to these Terms.</li>
                                    </ol>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Article 2 (Account Registration)</h2>
                                    <ol className="list-decimal list-inside space-y-2 ml-4">
                                        <li>Users may register for an account using the Company's designated method.</li>
                                        <li>
                                            The Company may reject registration if:
                                            <ul className="list-disc list-inside ml-6 mt-2 space-y-1">
                                                <li>False information is provided</li>
                                                <li>The applicant has previously violated these Terms</li>
                                                <li>The Company deems the registration inappropriate</li>
                                            </ul>
                                        </li>
                                    </ol>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Article 3 (API Key Management)</h2>
                                    <ol className="list-decimal list-inside space-y-2 ml-4">
                                        <li>Users must strictly manage their API keys and not disclose them to third parties.</li>
                                        <li>The Company is not liable for damages arising from inadequate API key management.</li>
                                    </ol>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Article 4 (Fees and Payment)</h2>
                                    <ol className="list-decimal list-inside space-y-2 ml-4">
                                        <li>Users shall pay the fees specified by the Company for using the Service.</li>
                                        <li>Fees are calculated based on the price list published on the Company's website.</li>
                                        <li>Payment shall be made by credit card or other methods designated by the Company.</li>
                                        <li>Paid fees are non-refundable in principle.</li>
                                    </ol>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Article 5 (Prohibited Acts)</h2>
                                    <p className="mb-3">Users shall not engage in the following acts:</p>
                                    <ol className="list-decimal list-inside space-y-2 ml-4">
                                        <li>Acts that violate laws or public order and morals</li>
                                        <li>Criminal acts</li>
                                        <li>Infringement of intellectual property rights</li>
                                        <li>Imposing excessive load on the Service network or systems</li>
                                        <li>Unauthorized access or reverse engineering</li>
                                        <li>Other acts deemed inappropriate by the Company</li>
                                    </ol>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Article 6 (Intellectual Property)</h2>
                                    <ol className="list-decimal list-inside space-y-2 ml-4">
                                        <li>All intellectual property rights related to the Service belong to the Company.</li>
                                        <li>
                                            Copyright of content generated by users through the Service
                                            (including rights of translation, adaptation, and other rights stipulated in Articles 27 and 28
                                            of the Japanese Copyright Act, pertaining to derivative works) belongs to the users.
                                        </li>
                                        <li>
                                            Users agree that the Company may use generated content solely for the purpose of
                                            improving and enhancing the quality of the Service, provided that the Company
                                            shall not infringe upon users' moral rights of authors.
                                        </li>
                                        <li>
                                            Users warrant that they will not infringe upon third-party intellectual property rights
                                            when using the Service.
                                        </li>
                                    </ol>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Article 7 (Disclaimer)</h2>
                                    <ol className="list-decimal list-inside space-y-2 ml-4">
                                        <li>The Company makes no warranty regarding the accuracy, completeness, or usefulness of the Service.</li>
                                        <li>
                                            The Company is not liable for damages arising from the use of the Service,
                                            except in cases of willful misconduct or gross negligence by the Company.
                                        </li>
                                    </ol>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Article 8 (Governing Law and Jurisdiction)</h2>
                                    <ol className="list-decimal list-inside space-y-2 ml-4">
                                        <li>These Terms shall be governed by and construed in accordance with Japanese law.</li>
                                        <li>
                                            The Tokyo District Court shall have exclusive jurisdiction over any disputes
                                            arising from these Terms.
                                        </li>
                                    </ol>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Contact</h2>
                                    <div className="bg-slate-50 p-4 rounded-lg mt-4">
                                        <p className="font-semibold">Stratoflow Inc.</p>
                                        <p className="mt-2">〒533-0005</p>
                                        <p>1-2-11-401 Zuiko, Higashiyodogawa-ku, Osaka-shi, Osaka, Japan</p>
                                        <p className="mt-2">Email: info@stratoflow.ai</p>
                                    </div>
                                </section>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Terms;
