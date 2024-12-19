import { supabase } from "../../../../utils/supabase";

// Jobの型
type Job = {
    category: string;
    salary: number;
    title: string;
};


export async function POST(req: Request) {
    const { category, salary, title }: Job = await req.json(); 
    
    if (!category || !salary || !title) {
        return new Response(JSON.stringify({ error: '必要な情報が入力されていません。' }), { status: 400 });
    }

    try {
        const { data, error } = await supabase.from("jobs").insert([{ category, salary, title }]);

        if (error) {
            return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        }

        return new Response(JSON.stringify({ message: '求人が投稿されました。', data }), { status: 200 });
    } catch (error: unknown) {
        if (error instanceof Error) {
            return new Response(JSON.stringify({ error: `求人投稿に失敗しました: ${error.message}` }), { status: 500 });
        } else {
            return new Response(JSON.stringify({ error: '求人投稿に失敗しました。' }), { status: 500 });
        }
    }
}

export async function GET() {
    try {
        const { data, error } = await supabase
            .from("jobs")
            .select("*");
        if (error) {
            return new Response(JSON.stringify({ error: error.message }), { status: 500 });
        }

        return new Response(JSON.stringify(data), { status: 200 });

    } catch (error: unknown) {
        if (error instanceof Error) {
            return new Response(JSON.stringify({ error: `求人データの取得に失敗しました: ${error.message}` }), { status: 500 });
        } else {
            return new Response(JSON.stringify({ error: "求人データの取得に失敗しました。" }), { status: 500 });
        }
    }
}