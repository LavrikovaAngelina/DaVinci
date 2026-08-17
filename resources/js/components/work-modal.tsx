import { useForm } from '@inertiajs/react';
import { useState } from 'react';

type Props = {
    taskId: number;
    tags: string[];
    onClose: () => void;
};

export default function WorkModal({ taskId, tags, onClose }: Props) {
    const [preview, setPreview] = useState<string | null>(null);
    const [dragging, setDragging] = useState(false);

    const { data, setData, post, processing, errors } = useForm({
        task_id: taskId,
        pic_name: '',
        pic_description: '',
        is_published: false,
        image: null as File | null,
    });

    const pickFile = (file: File | null) => {
        setData('image', file);
        setPreview(file ? URL.createObjectURL(file) : null);
    };

    const submit = () => {
        post('/pictures', {
            forceFormData: true,
            onSuccess: () => onClose(),
        });
    };

    return (
        <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
            onClick={onClose}
        >
            <div
                className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg bg-white shadow-xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex items-center justify-between border-b px-5 py-4">
                    <h2 className="text-lg font-medium">Ваша работа</h2>
                    <button onClick={onClose} className="text-xl text-neutral-400 hover:text-neutral-700">
                        ✕
                    </button>
                </div>

                <div className="space-y-4 p-5">
                    <label
                        onDragOver={(e) => {
                            e.preventDefault();
                            setDragging(true);
                        }}
                        onDragLeave={() => setDragging(false)}
                        onDrop={(e) => {
                            e.preventDefault();
                            setDragging(false);
                            pickFile(e.dataTransfer.files[0] ?? null);
                        }}
                        className={`flex h-44 cursor-pointer items-center justify-center rounded-xl border-2 border-dashed p-4 text-center text-sm ${
                            dragging ? 'border-blue-400 bg-blue-50' : 'border-neutral-300'
                        }`}
                    >
                        <input
                            type="file"
                            accept="image/webp,image/jpeg,image/png"
                            className="hidden"
                            onChange={(e) => pickFile(e.target.files?.[0] ?? null)}
                        />

                        {preview ? (
                            <img src={preview} alt="" className="max-h-full rounded" />
                        ) : (
                            <span className="text-neutral-400">
                                Выберите файл с Вашей работой на устройстве либо
                                перетащите его сюда, формат файла: WebP, JPEG, PNG
                            </span>
                        )}
                    </label>
                    {errors.image && <p className="text-sm text-red-600">{errors.image}</p>}

                    <div>
                        <input
                            value={data.pic_name}
                            onChange={(e) => setData('pic_name', e.target.value)}
                            placeholder="Название работы"
                            className="w-full rounded border border-neutral-300 px-3 py-2"
                        />
                        {errors.pic_name && (
                            <p className="mt-1 text-sm text-red-600">{errors.pic_name}</p>
                        )}
                    </div>

                    <textarea
                        value={data.pic_description}
                        onChange={(e) => setData('pic_description', e.target.value)}
                        placeholder="Полное описание работы"
                        rows={5}
                        className="w-full rounded border border-neutral-300 px-3 py-2"
                    />

                    <label className="flex items-center gap-2 text-sm">
                        <input
                            type="checkbox"
                            checked={data.is_published}
                            onChange={(e) => setData('is_published', e.target.checked)}
                        />
                        Публиковать
                    </label>

                    <div>
                        <p className="mb-2 text-sm text-neutral-500">Выбраны категории</p>
                        <div className="flex flex-wrap gap-2">
                            {tags.map((tag, i) => (
                                <span
                                    key={tag}
                                    className={`rounded px-3 py-1.5 text-base font-medium`}
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex justify-end gap-2 border-t px-5 py-4">
                    <button
                        onClick={onClose}
                        className="rounded bg-neutral-500 px-5 py-2 text-white hover:bg-neutral-600"
                    >
                        Закрыть
                    </button>
                    <button
                        onClick={submit}
                        disabled={processing}
                        className="rounded bg-blue-500 px-5 py-2 text-white hover:bg-blue-600 disabled:opacity-40"
                    >
                        {processing ? 'Сохранение...' : 'Сохранить'}
                    </button>
                </div>
            </div>
        </div>
    );
}
