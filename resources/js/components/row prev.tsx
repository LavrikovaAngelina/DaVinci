export default function Row({idea, toggleLike}) {

    return (
        <div
            key={idea.id}
            className="flex flex-wrap items-center gap-2 rounded border border-neutral-200 p-4"
        >
            {idea.parts.map((part, i) => (
                <>
                    <span
                        className="rounded bg-blue-500 px-3 py-1 text-white"
                    >
                        {part.category}:
                    </span>
                    <span
                        key={i}
                        className="rounded bg-green-600 px-3 py-1 text-white"
                        title={part.category}
                    >
                        #{part.tag_name}
                    </span>

                    
                </>
            ))}
            <button
                onClick={() => toggleLike(idea)}
                className="ml-auto text-2xl leading-none"
            >

                    <span className="text-neutral-300">♡ (row)</span>
            </button>

            
        </div>
    )

}