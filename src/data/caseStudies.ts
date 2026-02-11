export interface CaseStudy {
    id: string;
    titleJa: string;
    titleEn: string;
    summaryJa: string;
    summaryEn: string;
    date: string;
    tags: string[];
    imageUrl: string;
    companyProfile: {
        nameJa: string;
        nameEn: string;
        industryJa: string;
        industryEn: string;
        employees: string;
        businessJa: string;
        businessEn: string;
    };
    sections: {
        challenges: { titleJa: string; titleEn: string; contentJa: string; contentEn: string };
        solution: { titleJa: string; titleEn: string; contentJa: string; contentEn: string };
        effects: { titleJa: string; titleEn: string; contentJa: string; contentEn: string };
    };
    resultsJa: { label: string; value: string }[];
    resultsEn: { label: string; value: string }[];
}

export const CASE_STUDIES: CaseStudy[] = [
    {
        id: "apparel-d2c",
        titleJa: "生成AI画像で、D2Cアパレルの商品表現を標準化",
        titleEn: "Standardizing D2C Apparel Product Visualization with Generative AI",
        summaryJa: "商品登録時に入力する説明文をもとに、着用シーンや生活シーンの画像を生成AI画像APIで自動生成。画像制作コスト約70％削減。",
        summaryEn: "Automatically generating scene images from product descriptions using Generative AI Image API. Reduced image production costs by approx. 70%.",
        date: "2025-10-15",
        tags: ["画像モデル", "アパレル", "EC"],
        imageUrl: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?q=80&w=1600&auto=format&fit=crop", // 时尚/服装 场景的稳定链接
        companyProfile: {
            nameJa: "A社",
            nameEn: "Company A",
            industryJa: "アパレル（D2C）",
            industryEn: "Apparel (D2C)",
            employees: "18名 / 18",
            businessJa: "自社ECまたはモールでオリジナル商品を販売",
            businessEn: "Starts sales of original products on own EC or malls"
        },
        sections: {
            challenges: {
                titleJa: "導入前の悩み：「撮影待ち」で新作公開が止まる——少人数D2Cの“画像ボトルネック”",
                titleEn: "Before Introduction: New releases stalled by 'waiting for shoots' — The 'Image Bottleneck' of small D2C teams",
                contentJa: "X社は季節ごとの新作投入スピードを強みにしていましたが、その裏側で「画像の準備」が常に最後まで残る仕事になっていました。\n\n外注撮影は品質が安定する一方で、費用と日程調整が重く、予定通りに進まないことも少なくありません。社内で対応しようとしても、撮影・加工に慣れた人材はおらず、担当者が他業務を止めて対応するしかありませんでした。\n\n結果として、せっかく企画・製造が終わっても「画像が揃わないから掲載できない」という状況が起き、販売機会を逃してしまう。現場には「商品自体は良いのに、見せ方の準備が間に合わない」というストレスが溜まっていました。",
                contentEn: "Company A prided itself on the speed of seasonal new releases, but 'image preparation' was always the bottleneck.\n\nWhile outsourced photography offered stable quality, it came with heavy costs and scheduling adjustments, often causing delays. Trying to handle it in-house was difficult as no staff were skilled in photography or editing, forcing managers to stop other work to cover it.\n\nAs a result, even after planning and manufacturing were complete, products couldn't be listed because images weren't ready, leading to lost sales opportunities. The team was frustrated that 'great products were held back by presentation preparation'."
            },
            solution: {
                titleJa: "活用方法：商品説明から即生成。EC運用に溶け込む“シーン画像の自動供給”",
                titleEn: "Solution: Instant generation from descriptions. 'Automatic supply of scene images' blending into EC operations",
                contentJa: "X社は、画像制作のすべてをAIに置き換えるのではなく、「最も時間がかかる部分だけを補う」発想で生成AIを採用しました。\n\n商品登録時に入力する説明文をもとに、着用シーンや生活シーンの画像を生成AI画像APIで自動生成し、EC掲載用の候補素材としてすぐに使える状態に整備。さらに、同一商品に対して複数のテイスト（通勤・休日・室内など）を短時間で試せるようにしました。\n\n導入のポイントは、AIを別ツールとして扱うのではなく、いつもの商品登録作業の延長で素材が揃うようにしたことです。運用負荷を増やさない設計により、社内で自然に利用が定着していきました。",
                contentEn: "Company A adopted generative AI not to replace all image production, but to 'supplement the most time-consuming parts'.\n\nBased on descriptions entered during product registration, the system automatically generates images of wearing scenes and lifestyle scenes using the Generative AI Image API, preparing them as ready-to-use candidate assets for EC listings. Furthermore, it allowed testing multiple tastes (commuting, holiday, indoor, etc.) for the same product in a short time.\n\nThe key to implementation was not treating AI as a separate tool, but ensuring assets were ready as an extension of the usual product registration work. By designing it not to increase operational load, usage naturally took root within the company."
            },
            effects: {
                titleJa: "導入効果：公開スピードと見せ方の質を両立し、売れる導線が安定した",
                titleEn: "Effects: Balancing release speed and visual quality, stabilizing the path to sales",
                contentJa: "導入後、まず現場で実感されたのは「画像のために作業が止まらなくなった」ことでした。\n\nこれまで撮影待ち・外注待ちで止まっていた新商品公開が、最低限のビジュアルを確保した状態で先に公開できるようになり、商機を逃す場面が減りました。\n\nまた、複数の候補画像を短時間で作れることで、担当者が「どれが一番売れそうか」を試しながら選べるようになり、結果として見せ方の品質も安定。少人数運用のままでも、ブランド全体の視覚体験が整っていきました。",
                contentEn: "After implementation, the first thing the team realized was that 'work no longer stopped for images'.\n\nNew product releases, previously halted waiting for shoots or outsourcing, could now be published earlier with minimum visuals secured, reducing missed opportunities.\n\nAlso, being able to create multiple candidate images in a short time allowed managers to choose while testing 'what would sell best', resulting in stable presentation quality. Even with a small team, the overall visual experience of the brand improved."
            }
        },
        resultsJa: [
            { label: "画像制作コスト", value: "約70％削減" },
            { label: "新商品掲載リードタイム", value: "50％短縮" },
            { label: "クリック率（CTR）", value: "約22％向上" }
        ],
        resultsEn: [
            { label: "Image Production Cost", value: "70% Reduction" },
            { label: "New Product Time-to-Web", value: "50% Reduction" },
            { label: "Click Through Rate", value: "22% Increase" }
        ]
    },
    {
        id: "food-chain-promotion",
        titleJa: "生成AI動画で、飲食チェーンの店舗販促を仕組み化",
        titleEn: "Systematizing Food Chain Store Promotion with Generative AI Video",
        summaryJa: "本部で一括生成・店舗は投稿だけ。生成AI動画APIで短尺動画を自動生成し、動画制作コストを約80％削減。",
        summaryEn: "Centralized generation at HQ, stores just post. Automatically generating short videos with Generative AI Video API, reducing production costs by approx. 80%.",
        date: "2025-09-28",
        tags: ["動画モデル", "飲食", "店舗販促"],
        imageUrl: "https://images.unsplash.com/photo-1552566626-52f8b828add9?q=80&w=1600&auto=format&fit=crop", // 餐饮场景
        companyProfile: {
            nameJa: "B社",
            nameEn: "Company B",
            industryJa: "飲食チェーン",
            industryEn: "Restaurant Chain",
            employees: "45名 / 45",
            businessJa: "関西エリアで複数店舗を展開",
            businessEn: "Operating multiple stores in Kansai area"
        },
        sections: {
            challenges: {
                titleJa: "導入前の悩み：動画が続かない。店舗任せのSNS運用が限界に達していた",
                titleEn: "Before Introduction: Videos weren't sustainable. Store-managed SNS operations reached their limit",
                contentJa: "B社ではSNSが集客に直結することを理解していましたが、現場は常に人手不足です。\n\n店舗スタッフに動画撮影や編集の余裕はなく、更新頻度は月によってバラつきがありました。新メニューの投入や季節キャンペーンがあっても、告知は写真と短文で終わり、拡散力が伸びない。動画は「作れたら強いが、毎回は無理」という位置付けでした。\n\n特に複数店舗運営では、各店が独自に頑張るほど品質がぶれるため、「本部が標準化したい」と考えても制作コストと手間が重く、なかなか解決できない課題でした。",
                contentEn: "Company B understood that SNS directly impacted foot traffic, but the sites were always understaffed.\n\nStore staff had no time for video shooting or editing, and update frequency varied by month. Even with new menu launches or seasonal campaigns, announcements ended with photos and short text, limiting reach. Video was seen as 'powerful if made, but impossible every time'.\n\nEspecially in multi-store operations, quality varied as each store tried independently. Even if HQ wanted to standardize, the production cost and effort were too high, making it a persistent issue."
            },
            solution: {
                titleJa: "活用方法：本部で一括生成・店舗は投稿だけ。短尺動画を“仕組み”として量産",
                titleEn: "Solution: Centralized generation at HQ, stores just post. Mass-producing short videos as a 'system'",
                contentJa: "X社は、制作を店舗に任せるのではなく、本部で一括制作して配布する運用に切り替えました。\n\nその中核として、当社の生成AI動画APIを採用。メニュー説明文・価格・写真など、既に存在する情報を素材として入力し、15〜30秒の短尺動画を自動生成。SNSに合わせた比率（縦型中心）も同時に整備できるようにしました。\n\nこれにより、本部側は「毎週の定型業務」として動画を作れるようになり、店舗側は受け取って投稿するだけ。現場負担を増やさず、販促の再現性が一気に上がりました。",
                contentEn: "Company B switched to an operation where HQ produces and distributes content centrally, rather than leaving it to stores.\n\nAt the core, they adopted our Generative AI Video API. Using existing info like menu descriptions, prices, and photos as assets, it automatically generates 15-30 second short videos. It also prepared aspect ratios optimized for SNS (vertical).\n\nThis allowed HQ to create videos as 'weekly routine work', and stores just had to receive and post. Without increasing site burden, the reproducibility of promotions improved dramatically."
            },
            effects: {
                titleJa: "導入効果：投稿が止まらなくなり、来店導線が強くなった",
                titleEn: "Effects: Posting never stopped, strengthening the path to store visits",
                contentJa: "導入後は、まずSNSの運用が「止まらなくなった」ことが大きな変化でした。\n\n動画制作が属人化していた頃は、担当者が忙しい時期に更新が途切れがちでしたが、生成AIによって制作がルーチン化され、投稿頻度が安定しました。\n\nさらに、新メニュー投入時に「動画があるかどうか」で反応の差が見え始め、各店の店長からも「投稿後の問い合わせが増えた」といった声が増加。販促活動が“気合い”ではなく“仕組み”で回る状態になりました。",
                contentEn: "After implementation, the big change was that SNS operations 'stopped stopping'.\n\nWhen video production was personalized, updates often paused when staff were busy, but generative AI routinized production, stabilizing posting frequency.\n\nFurthermore, the difference in reaction based on 'whether video exists' became visible during new menu launches, and store managers reported increased inquiries after posting. Promotional activities began to run on a 'system' rather than 'sheer will'."
            }
        },
        resultsJa: [
            { label: "動画制作コスト", value: "約80％削減" },
            { label: "SNS更新頻度", value: "約3倍" },
            { label: "来店問い合わせ数", value: "約18％増加" }
        ],
        resultsEn: [
            { label: "Video Production Cost", value: "80% Reduction" },
            { label: "SNS Update Frequency", value: "3x Increase" },
            { label: "Store Inquiries", value: "18% Increase" }
        ]
    },
    {
        id: "manufacturing-proposal",
        titleJa: "生成AI画像で、製造業の提案を“伝わる形”に変換",
        titleEn: "Transforming Manufacturing Proposals into 'Forms that Convey' with Generative AI",
        summaryJa: "顧客の要件を文章で整理し、生成AI画像APIで設備配置や構成イメージを生成。提案準備時間を約60％短縮。",
        summaryEn: "Organizing customer requirements in text and generating equipment layout images with Generative AI Image API. Reduced proposal preparation time by approx. 60%.",
        date: "2025-08-20",
        tags: ["画像モデル", "製造業", "営業支援"],
        imageUrl: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?q=80&w=1600&auto=format&fit=crop", // 制造/工厂 场景
        companyProfile: {
            nameJa: "C社",
            nameEn: "Company C",
            industryJa: "製造業",
            industryEn: "Manufacturing",
            employees: "62名 / 62",
            businessJa: "工場向け設備・生産ラインを提案",
            businessEn: "Proposing factory equipment and production lines"
        },
        sections: {
            challenges: {
                titleJa: "導入前の悩み：図面は正しいのに伝わらない——初期商談で起きる“理解の壁”",
                titleEn: "Before Introduction: Drawings are correct but don't convey — The 'Wall of Understanding' in initial sales",
                contentJa: "C社の強みは、顧客の現場に合わせた提案力でした。しかし提案が高度になるほど、初期説明が難しくなります。\n\n技術資料や図面は正確でも、顧客側が初見で理解できるとは限りません。結果として「一度持ち帰って検討します」になり、次回商談までの間に熱が冷める。あるいは、誤解が生じて再説明が必要になり、商談が伸びる。こうしたロスが積み重なっていました。\n\n現場では、営業がエンジニアに都度確認しながら資料を整えるため、準備コストも高止まりしていました。",
                contentEn: "Company C's strength was its proposal ability tailored to customer sites. However, the more advanced the proposal, the harder the initial explanation.\n\nTechnical documents and drawings were accurate, but customers couldn't always understand them at first glance. This resulted in 'we'll take it back and consider it', cooling interest before the next meeting. Or misunderstandings required re-explanation, prolonging negotiations. These losses were piling up.\n\nAlso, preparation costs remained high as sales had to constantly check with engineers to prepare materials."
            },
            solution: {
                titleJa: "活用方法：要件を文章化→構成イメージ化。営業が説明できる提案資料へ変換",
                titleEn: "Solution: Textualize requirements -> Visualize structure. Converting to proposal materials sales can explain",
                contentJa: "C社は、提案の正確性を守りつつ、最初に“伝わる形”を用意するために生成AIを導入しました。\n\n顧客の要件を文章で整理し、当社の生成AI画像APIで設備配置や構成イメージを生成。営業担当が「まず全体像を見せる」ことで、顧客の理解を短時間で揃えられるようにしました。\n\n最終的な設計や寸法の確定は従来通りエンジニアが担当しますが、商談初期のコミュニケーションが整理されたことで、全体の進行がスムーズになりました。",
                contentEn: "Company C introduced generative AI to prepare 'forms that convey' initially, while maintaining proposal accuracy.\n\nThey organized customer requirements in text and generated equipment layout and configuration images using our Generative AI Image API. By allowing sales staff to 'show the big picture first', they could align customer understanding quickly.\n\nEngineers still handled final design and dimensions, but organizing initial communication smoothed the overall process."
            },
            effects: {
                titleJa: "導入効果：商談の停滞が減り、提案の回転率と受注確度が上がった",
                titleEn: "Effects: Reduced negotiation stagnation, improved proposal turnover and close rates",
                contentJa: "導入後に大きく変わったのは、初回商談での反応でした。\n\n顧客が「どこに、何が、どう置かれるのか」を早い段階でイメージできるため、質問の質が具体的になり、検討スピードが上がりました。\n\nその結果、提案準備に必要だった社内工数が削減され、営業の回転率も改善。商談の停滞が減り、受注までの流れが一段階滑らかになりました。",
                contentEn: "The big change after implementation was the reaction in initial meetings.\n\nBecause customers could visualize 'what goes where and how' early on, questions became specific and consideration speed increased.\n\nAs a result, internal man-hours for proposal preparation were reduced, and sales turnover improved. Negotiation stagnation decreased, and the flow to closing became smoother."
            }
        },
        resultsJa: [
            { label: "提案準備時間", value: "約60％短縮" },
            { label: "受注率", value: "約15％向上" },
            { label: "営業回転率", value: "改善" }
        ],
        resultsEn: [
            { label: "Proposal Prep Time", value: "60% Reduction" },
            { label: "Win Rate", value: "15% Increase" },
            { label: "Sales Turnover", value: "Improved" }
        ]
    },
    {
        id: "education-content",
        titleJa: "生成AI動画で、教育コンテンツ制作を高速化",
        titleEn: "Accelerating Educational Content Creation with Generative AI Video",
        summaryJa: "教材テキストを起点に動画を作成。講師は監修に集中し、制作コストを約65％削減、新規講座公開速度を2倍に。",
        summaryEn: "Creating videos from textbook text. Lecturers focus on supervision, reducing production costs by 65% and doubling new course release speed.",
        date: "2025-07-12",
        tags: ["動画モデル", "教育", "コンテンツ制作"],
        imageUrl: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?q=80&w=1600&auto=format&fit=crop", // 教室/教育 场景
        companyProfile: {
            nameJa: "D社",
            nameEn: "Company D",
            industryJa: "教育・研修",
            industryEn: "Education / Training",
            employees: "28名 / 28",
            businessJa: "社会人向け講座・法人研修を提供",
            businessEn: "Providng courses for working professionals and corporate training"
        },
        sections: {
            challenges: {
                titleJa: "導入前の悩み：講師の稼働が制作速度を決める——更新が追いつかない構造課題",
                titleEn: "Before Introduction: Lecturer availability determines production speed — Structural issue of updates lagging",
                contentJa: "D社は、カリキュラムの質に強みがある一方で、コンテンツ制作が講師の稼働に依存していました。\n\n収録には準備が必要で、撮影・編集の工程も重く、更新や差し替えが簡単にできません。特にIT分野は変化が早く、「今の市場に合わせてアップデートしたい」というニーズがあっても、制作が追いつかない状況でした。\n\n法人研修では顧客ごとに求める内容が異なるため、本来なら柔軟に作り分けたい。しかし制作負担がボトルネックとなり、理想的な対応が難しいという課題がありました。",
                contentEn: "Company D had strength in curriculum quality, but content production depended on lecturer availability.\n\nRecording required prep, and shooting/editing were heavy processes, making updates difficult. Especially in IT, things change fast, and even with needs to 'update for current market', production couldn't keep up.\n\nIn corporate training, clients want different content, so ideally they wanted to customize flexibly. But production burden was a bottleneck, making ideal response difficult."
            },
            solution: {
                titleJa: "活用方法：教材から動画生成、講師は監修へ。制作を軽量化する運用転換",
                titleEn: "Solution: Generating videos from text, lecturers to supervision. Operational shift to lighten production",
                contentJa: "そこでD社は、教材テキストを起点に動画を作れる仕組みとして、当社の生成AI動画APIを導入しました。\n\n教材内容から講義動画を生成し、講師は出演者ではなく監修者として関与。内容の正確性と伝え方を確認し、必要な部分だけ調整する体制へ移行しました。\n\n結果として、講師の時間が「収録」ではなく「品質管理」に使われるようになり、制作工程が軽量化されました。",
                contentEn: "So Company D introduced our Generative AI Video API as a system to create videos starting from textbook text.\n\nThey generated lecture videos from content, and lecturers got involved as supervisors, not actors. They shifted to a system of checking accuracy and delivery, adjusting only necessary parts.\n\nAs a result, lecturer time was used for 'quality control' instead of 'recording', lightening the production process."
            },
            effects: {
                titleJa: "導入効果：改善サイクルが回り、法人向けの継続成果につながった",
                titleEn: "Effects: Improvement cycles turned, leading to sustained results for corporate clients",
                contentJa: "導入後は、コンテンツ更新が“溜まる”感覚が大きく減りました。\n\n必要なタイミングで必要なだけ作れるため、講座の改善スピードが上がり、法人顧客に対しても柔軟な差し替えが可能に。制作が追いつくことで、運営の攻め方そのものが変わりました。",
                contentEn: "After implementation, the feeling of content updates 'piling up' decreased significantly.\n\nBecause they could make as much as needed when needed, course improvement speed increased, and flexible replacements for corporate clients became possible. With production keeping up, the offensive strategy of operation changed."
            }
        },
        resultsJa: [
            { label: "制作コスト", value: "約65％削減" },
            { label: "新規講座の公開速度", value: "約2倍" },
            { label: "法人契約継続率", value: "約20％向上" }
        ],
        resultsEn: [
            { label: "Production Cost", value: "65% Reduction" },
            { label: "New Course Release Speed", value: "2x" },
            { label: "Corporate Renewal Rate", value: "20% Increase" }
        ]
    }
];
