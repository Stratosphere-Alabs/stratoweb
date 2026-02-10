import React from "react";
import { useNavigate } from "react-router-dom";
import { useLanguage } from "../../LanguageContext";

const Privacy: React.FC = () => {
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
                            <h1 className="text-4xl font-bold text-slate-900 mb-8 tracking-tight">プライバシーポリシー</h1>

                            <div className="prose prose-slate max-w-none space-y-8 text-slate-700">
                                <section className="text-sm text-slate-500 space-y-1">
                                    <p>施行日：2025年10月7日</p>
                                    <p>最終更新日：2025年10月7日</p>
                                </section>

                                <p className="leading-relaxed">
                                    本プライバシーポリシー（以下「本ポリシー」といいます。）は、Stratoflow株式会社（英文表記：Stratoflow Inc.、以下「当社」といいます。）が提供するプラットフォーム、API、ウェブサイト、製品および関連サービス（以下総称して「本サービス」といいます。）の利用に関連して、当社が取得する個人情報の取扱いについて定めるものです。<br />
                                    本ポリシーは、日本の個人情報の保護に関する法律（APPI／個人情報保護法）、電気通信事業法、およびこれらに関連するガイドラインその他の日本法令を遵守して策定されています。<br />
                                    ユーザーが本サービスを利用した場合、本ポリシーに基づく個人情報の取得および利用に同意したものとみなされます。本ポリシーに同意いただけない場合は、本サービスの利用を中止してください。
                                </p>

                                <hr className="border-slate-100" />

                                <section>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-4">第1条（適用範囲）</h2>
                                    <div className="space-y-4">
                                        <p>本ポリシーは、以下の場合に適用されます。</p>
                                        <ul className="list-disc list-inside space-y-2 ml-4">
                                            <li>日本国内に所在するユーザー、または日本国内から本サービスにアクセスするユーザー</li>
                                            <li>当社のサーバー、API、または提携する分散計算インフラを通じてデータ処理が行われるすべてのグローバルユーザー</li>
                                        </ul>
                                        <p>日本国内から本サービスを利用する場合、当社は、すべての個人情報を日本法に完全に準拠して取り扱います。</p>
                                    </div>
                                </section>

                                <hr className="border-slate-100" />

                                <section>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-4">第2条（取得する情報）</h2>
                                    <div className="space-y-6">
                                        <p>当社は、以下の情報を取得することがあります。</p>

                                        <div className="space-y-3">
                                            <h3 className="text-lg font-bold text-slate-800">1. アカウント情報</h3>
                                            <p>ユーザーがアカウントを作成する場合、またはGoogle、GitHub等の第三者プラットフォームを通じてログインする場合、以下の情報を取得することがあります。</p>
                                            <ul className="list-disc list-inside space-y-1 ml-4 text-slate-600">
                                                <li>氏名または表示名</li>
                                                <li>メールアドレス</li>
                                                <li>ログイン識別子または認証トークン</li>
                                                <li>所属組織または関連情報</li>
                                            </ul>
                                        </div>

                                        <div className="space-y-3">
                                            <h3 className="text-lg font-bold text-slate-800">2. 決済情報</h3>
                                            <p>本サービスの料金支払いは、Stripe、Pay.jp等の第三者決済事業者を通じて行われます。<br />当社は、クレジットカード番号等の完全な決済情報を直接保存しません。<br />ただし、会計処理および不正防止の目的で、取引ID、支払金額、決済日時等を保持することがあります。</p>
                                        </div>

                                        <div className="space-y-3">
                                            <h3 className="text-lg font-bold text-slate-800">3. 利用状況・技術情報</h3>
                                            <p>ユーザーが本プラットフォームまたはAPIを利用する際、以下の情報を自動的に取得することがあります。</p>
                                            <ul className="list-disc list-inside space-y-1 ml-4 text-slate-600">
                                                <li>IPアドレスおよび大まかな位置情報（国・地域レベル）</li>
                                                <li>デバイス情報、ブラウザ種別、OS</li>
                                                <li>APIリクエストログ、モデル利用履歴</li>
                                                <li>システムイベントログ（エラー情報、遅延指標等）</li>
                                            </ul>
                                        </div>

                                        <div className="space-y-3">
                                            <h3 className="text-lg font-bold text-slate-800">4. インタラクションデータ</h3>
                                            <p>ユーザーは、本サービスを通じて、テキスト、画像、コード等のデータ（以下「インタラクションデータ」といいます。）を入力、送信、処理、生成することがあります。<br />当社は、以下の場合を除き、インタラクションデータを閲覧または利用しません。</p>
                                            <ul className="list-disc list-inside space-y-1 ml-4 text-slate-600">
                                                <li>本サービスの維持、保守、障害対応に必要な場合</li>
                                                <li>法令に基づく開示義務がある場合</li>
                                                <li>ユーザーから明示的に技術サポートを依頼された場合</li>
                                            </ul>
                                            <p className="text-sm">特段の定めがない限り、当社は、サービス提供に必要な処理期間を超えてインタラクションデータを保持または内容確認しません。</p>
                                        </div>
                                    </div>
                                </section>

                                <hr className="border-slate-100" />

                                <section>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-4">第3条（利用目的）</h2>
                                    <p className="mb-4">当社は、取得した情報を以下の正当な目的の範囲内でのみ利用します。</p>
                                    <ol className="list-decimal list-inside space-y-2 ml-4 text-slate-600">
                                        <li>本サービスの提供・運営・認証</li>
                                        <li>利用料金の請求およびサブスクリプション管理</li>
                                        <li>問い合わせ対応および技術サポート</li>
                                        <li>不正アクセス、濫用、詐欺行為の防止</li>
                                        <li>日本法令に基づく義務の履行</li>
                                        <li>統計的・匿名化された利用分析によるサービス改善</li>
                                        <li>メンテナンス、仕様変更等に関する通知</li>
                                    </ol>
                                    <p className="mt-4 text-sm">APPI第16条に基づき、上記目的を超えて個人情報を利用する場合には、事前にユーザーの同意を取得します。</p>
                                </section>

                                <hr className="border-slate-100" />

                                <section>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-4">第4条（処理の法的根拠）</h2>
                                    <p>日本国内のユーザーに関する個人情報は、以下のいずれかを法的根拠として処理されます。</p>
                                    <ul className="list-disc list-inside space-y-2 ml-4 mt-3 text-slate-600">
                                        <li>ユーザーの同意</li>
                                        <li>契約の履行</li>
                                        <li>法令に基づく義務</li>
                                        <li>ユーザーの権利利益を不当に侵害しない範囲での正当な利益</li>
                                    </ul>
                                </section>

                                <hr className="border-slate-100" />

                                <section>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-4">第5条（保存期間）</h2>
                                    <p>当社は、以下の目的を達成するために必要な期間に限り、個人情報を保存します。</p>
                                    <ul className="list-disc list-inside space-y-2 ml-4 mt-3 text-slate-600">
                                        <li>本サービスの提供</li>
                                        <li>法令遵守</li>
                                        <li>紛争解決および契約履行</li>
                                    </ul>
                                    <p className="mt-4 text-sm">インタラクションデータおよびログデータは、原則として90日以内に削除または匿名化されます。ただし、運用上、法的、またはセキュリティ上必要な場合はこの限りではありません。</p>
                                </section>

                                <hr className="border-slate-100" />

                                <section>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-4">第6条（第三者提供）</h2>
                                    <p>当社は、以下の場合に限り、必要最小限の情報を第三者に提供することがあります。</p>
                                    <div className="space-y-4 mt-4">
                                        <div className="bg-slate-50 p-4 rounded-xl">
                                            <h4 className="font-bold mb-2">1. 業務委託先</h4>
                                            <ul className="list-disc list-inside space-y-1 ml-2 text-sm text-slate-600">
                                                <li>決済事業者（Stripe、Pay.jp等）</li>
                                                <li>クラウド・計算インフラ提供事業者</li>
                                                <li>カスタマーサポートまたは分析サービス事業者</li>
                                            </ul>
                                        </div>
                                        <div>
                                            <h4 className="font-bold mb-1">2. 法令遵守</h4>
                                            <p className="text-sm">電気通信事業法、刑事訴訟法等に基づき、裁判所または行政機関から開示を求められた場合</p>
                                        </div>
                                        <div>
                                            <h4 className="font-bold mb-1">3. 事業承継</h4>
                                            <p className="text-sm">合併、買収、組織再編等に伴い、守秘義務を条件として承継先に移転される場合</p>
                                        </div>
                                    </div>
                                    <p className="mt-6 text-sm font-medium">当社は、個人情報を第三者に販売し、マーケティングまたはプロファイリング目的で利用することはありません。</p>
                                </section>

                                <hr className="border-slate-100" />

                                <section>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-4">第7条（越境データ移転）</h2>
                                    <p>
                                        当社は、分散型計算インフラの特性上、日本国外のサーバーで処理を行う場合があります。<br />
                                        この場合、APPI第28条および関連ガイドラインに従い、以下の措置を講じます。
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 ml-4 mt-3 text-slate-600">
                                        <li>十分な個人情報保護水準を有する国・地域への移転</li>
                                        <li>標準契約条項（SCC）等の適切な保護措置の実施</li>
                                        <li>移転記録および受領先の管理体制の確認</li>
                                    </ul>
                                    <p className="mt-4 text-sm">詳細については、当社までお問い合わせください。</p>
                                </section>

                                <hr className="border-slate-100" />

                                <section>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-4">第8条（安全管理措置）</h2>
                                    <p>当社は、以下の技術的・組織的安全管理措置を講じています。</p>
                                    <ul className="list-disc list-inside space-y-2 ml-4 mt-3 text-slate-600">
                                        <li>通信および保存時の暗号化（TLS/SSL）</li>
                                        <li>アクセス制御および認証管理</li>
                                        <li>定期的なセキュリティ監査およびテスト</li>
                                        <li>職務に応じたアクセス権限制御</li>
                                    </ul>
                                    <p className="mt-4 text-sm">個人情報漏えい等が発生した場合、法令に基づき、速やかにユーザーおよび関係機関へ通知します。</p>
                                </section>

                                <hr className="border-slate-100" />

                                <section>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-4">第9条（ユーザーの権利）</h2>
                                    <p>ユーザーは、APPI第33条〜第36条に基づき、以下を請求できます。</p>
                                    <ol className="list-decimal list-inside space-y-2 ml-4 mt-3 text-slate-600">
                                        <li>保有個人データの開示</li>
                                        <li>訂正、追加または削除</li>
                                        <li>利用停止または第三者提供の停止</li>
                                        <li>取扱い内容の説明</li>
                                    </ol>
                                </section>

                                <hr className="border-slate-100" />

                                <section>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-4">第10条（Cookie等）</h2>
                                    <p>
                                        当社ウェブサイトでは、利便性向上のためCookie等を使用する場合があります。<br />
                                        ブラウザ設定により無効化できますが、一部機能が制限される場合があります。
                                    </p>
                                </section>

                                <hr className="border-slate-100" />

                                <section>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-4">第11条（未成年者）</h2>
                                    <p>16歳未満の個人から意図的に個人情報を取得することはありません。</p>
                                </section>

                                <hr className="border-slate-100" />

                                <section>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-4">第12条（国際ユーザー）</h2>
                                    <p>日本国外のユーザーは、日本法に基づきデータが処理されることに同意するものとします。</p>
                                </section>

                                <hr className="border-slate-100" />

                                <section>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-4">第13条（お問い合わせ先）</h2>
                                    <div className="bg-slate-50 p-6 rounded-2xl space-y-2">
                                        <p className="font-bold text-slate-900">個人情報保護管理責任者</p>
                                        <p className="text-lg font-semibold">Stratoflow株式会社</p>
                                        <p className="text-slate-600">〒530-0001 大阪府</p>
                                        <p className="text-blue-600 font-medium">Email：info@stratoflow.ai</p>
                                    </div>
                                </section>

                                <hr className="border-slate-100" />

                                <section>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-4">第14条（改定）</h2>
                                    <p>
                                        本ポリシーは、法令変更等により改定されることがあります。<br />
                                        改定後の利用は、同意とみなされます。
                                    </p>
                                </section>

                                <hr className="border-slate-100" />

                                <section>
                                    <h2 className="text-2xl font-bold text-slate-900 mb-4">第15条（準拠法・管轄）</h2>
                                    <p>本ポリシーは日本法を準拠法とし、大阪地方裁判所を専属的合意管轄裁判所とします。</p>
                                </section>
                            </div>
                        </>
                    ) : (
                        <>
                            <h1 className="text-4xl font-bold text-slate-900 mb-8">Privacy Policy</h1>

                            <div className="prose prose-slate max-w-none space-y-6 text-slate-700">
                                <p className="text-sm text-slate-500">Effective Date: October 7, 2025</p>

                                <section>
                                    <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">Overview</h2>
                                    <p>
                                        This Privacy Policy describes how Stratoflow Inc. ("we", "our", or "Company") collects, uses,
                                        and protects personal information in compliance with Japan's Act on the Protection of Personal
                                        Information (APPI) and the Telecommunications Business Act.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">1. Scope</h2>
                                    <p>
                                        This Privacy Policy applies to users in Japan and global users whose data is processed by Stratoflow.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">2. Information We Collect</h2>

                                    <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">2.1 Account Information</h3>
                                    <p className="mb-3">We collect the following account-related information:</p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>Name</li>
                                        <li>Email address</li>
                                        <li>Login identifiers</li>
                                    </ul>

                                    <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">2.2 Payment Information</h3>
                                    <p className="mb-3">For payment processing, we collect:</p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>Transaction IDs</li>
                                        <li>Timestamps</li>
                                    </ul>
                                    <p className="mt-3 text-sm text-slate-600">
                                        <strong>Note:</strong> Full credit card information is NOT stored by Stratoflow. Payment processing is handled via third-party providers (Stripe, Pay.jp).
                                    </p>

                                    <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">2.3 Usage and Technical Information</h3>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>IP addresses</li>
                                        <li>Browser types</li>
                                        <li>Usage logs</li>
                                    </ul>

                                    <h3 className="text-xl font-semibold text-slate-800 mt-6 mb-3">2.4 Interaction Data</h3>
                                    <p>
                                        Input/output data generated through APIs and Platform usage.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">3. How We Use Your Information</h2>
                                    <p className="mb-3">We use the collected information for the following purposes:</p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>To provide and maintain our services</li>
                                        <li>To improve platform performance and user experience</li>
                                        <li>To comply with legal requirements</li>
                                        <li>To communicate important updates and changes</li>
                                    </ul>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">4. Data Retention and Storage</h2>
                                    <p>
                                        Your data is stored on secure servers (AWS/Google Cloud) and retained as long as necessary
                                        for providing our services. We implement industry-standard security measures to protect your data.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">5. Disclosure and Sharing</h2>
                                    <p className="mb-3">
                                        We only share your personal information in the following circumstances:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>With service providers (e.g., payment processors) under appropriate data protection agreements</li>
                                        <li>When required by law or legal process</li>
                                        <li>To protect the rights, property, or safety of Stratoflow, our users, or others</li>
                                    </ul>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">6. User Rights (APPI Compliance)</h2>
                                    <p className="mb-3">Under the Act on the Protection of Personal Information (APPI), you have the right to:</p>
                                    <ul className="list-disc list-inside space-y-2 ml-4">
                                        <li>Access your personal data</li>
                                        <li>Correct inaccurate personal data</li>
                                        <li>Delete your personal data</li>
                                        <li>Request suspension of use of your personal data</li>
                                    </ul>
                                    <p className="mt-3">
                                        To exercise these rights, please contact our Legal Department using the information provided below.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">7. Security</h2>
                                    <p>
                                        We implement robust security measures to protect your personal information, including:
                                    </p>
                                    <ul className="list-disc list-inside space-y-2 ml-4 mt-3">
                                        <li>Encryption (SSL/TLS) for data in transit</li>
                                        <li>Organizational safeguards and access controls</li>
                                        <li>Regular security audits and monitoring</li>
                                    </ul>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">8. International Transfers</h2>
                                    <p>
                                        Your data may be transferred outside Japan for processing. When such transfers occur,
                                        we ensure appropriate safeguards are in place in accordance with Article 28 of the APPI
                                        regarding overseas data transfer requirements.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">9. Changes to This Policy</h2>
                                    <p>
                                        We may update this Privacy Policy periodically. For material changes, we will notify you
                                        through appropriate channels. Continued use of our services after such changes constitutes
                                        acceptance of the updated policy.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">10. Summary of Key Compliance Elements</h2>
                                    <div className="overflow-x-auto mt-4">
                                        <table className="min-w-full border border-slate-200 rounded-lg overflow-hidden">
                                            <thead className="bg-slate-100">
                                                <tr>
                                                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 border-b">Area</th>
                                                    <th className="px-4 py-3 text-left text-sm font-semibold text-slate-700 border-b">Japan-specific Legal Basis</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr className="bg-white">
                                                    <td className="px-4 py-3 text-sm border-b">Personal data definition</td>
                                                    <td className="px-4 py-3 text-sm border-b">Article 2 of the Act on the Protection of Personal Information (APPI)</td>
                                                </tr>
                                                <tr className="bg-slate-50">
                                                    <td className="px-4 py-3 text-sm border-b">Cross-border transfers</td>
                                                    <td className="px-4 py-3 text-sm border-b">Article 28 (Overseas data transfer requirements)</td>
                                                </tr>
                                                <tr className="bg-white">
                                                    <td className="px-4 py-3 text-sm border-b">Individual rights</td>
                                                    <td className="px-4 py-3 text-sm border-b">Articles 33–36 (Disclosure, correction, suspension, deletion)</td>
                                                </tr>
                                                <tr className="bg-slate-50">
                                                    <td className="px-4 py-3 text-sm border-b">Data breach notification</td>
                                                    <td className="px-4 py-3 text-sm border-b">2022 Amendment to APPI, Article 26-2</td>
                                                </tr>
                                                <tr className="bg-white">
                                                    <td className="px-4 py-3 text-sm border-b">Telecommunications compliance</td>
                                                    <td className="px-4 py-3 text-sm border-b">Telecommunications Business Act (Articles 4–27)</td>
                                                </tr>
                                                <tr className="bg-slate-50">
                                                    <td className="px-4 py-3 text-sm">Supervisory authority</td>
                                                    <td className="px-4 py-3 text-sm">Personal Information Protection Commission (PPC)</td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </div>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">11. Governing Law and Jurisdiction</h2>
                                    <p>
                                        This Privacy Policy shall be governed by and construed in accordance with the laws of Japan.
                                        Any disputes arising from or in connection with this policy shall be subject to the exclusive
                                        jurisdiction of the Osaka District Court.
                                    </p>
                                </section>

                                <section>
                                    <h2 className="text-2xl font-bold text-slate-900 mt-8 mb-4">12. Contact Us</h2>
                                    <p className="mb-3">
                                        For inquiries regarding personal information handling, please contact:
                                    </p>
                                    <div className="bg-slate-50 p-4 rounded-lg mt-4">
                                        <p className="font-semibold">Stratoflow Inc. Legal Department</p>
                                        <p className="mt-2">〒533-0005</p>
                                        <p>1-2-11-401 Zuiko, Higashiyodogawa-ku, Osaka-shi, Osaka, Japan</p>
                                        <p className="mt-2">Email: legal@stratoflow.ai</p>
                                    </div>
                                </section>

                                <section className="bg-blue-50 p-4 rounded-lg mt-8 border border-blue-100">
                                    <p className="text-sm text-slate-600">
                                        <strong>Note:</strong> While translations may be provided, the English version of this Privacy Policy
                                        remains the legally binding document.
                                    </p>
                                </section>
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Privacy;
