import { router, useForm } from '@inertiajs/react';
import { getHueFromString } from '@/components/get-hue';

type Props = {
    picture: {
        id: number;
        name: string;
        description: string | null;
        image: string;
        tags: string[];
    };
    onClose: () => void;
};

export default function EditWorkModal({ picture, onClose }: Props) {
    const { data, setData, put, delete: destroy, processing, errors } = useForm({
        pic_name: picture.name,
        pic_description: picture.description ?? '',
    });

    const submit = () => {
        put(`/pictures/${picture.id}`, {
            onSuccess: () => {router.visit('/');},
        });
    };

    const remove = () => {
        if (!confirm('Вы действительно хотите удалить эту работу?')) {
            return;
        }

        destroy(`/pictures/${picture.id}`, {
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
                    <h2 className="text-lg font-medium">
                        Редактирование работы
                    </h2>

                    <button
                        onClick={onClose}
                        className="text-xl text-neutral-400 hover:text-neutral-700"
                    >
                        ✕
                    </button>
                </div>

                <div className="space-y-4 p-5">
                    {/* Изображение — только просмотр */}
                    <div className="flex h-44 items-center justify-center overflow-hidden rounded-xl border border-neutral-300 bg-neutral-100">
                        <img
                            src={picture.image}
                            alt={picture.name}
                            className="max-h-full max-w-full object-contain"
                        />
                    </div>

                    {/* Название */}
                    <div>
                        <input
                            value={data.pic_name}
                            onChange={(e) =>
                                setData('pic_name', e.target.value)
                            }
                            placeholder="Название работы"
                            className="w-full rounded border border-neutral-300 px-3 py-2"
                        />

                        {errors.pic_name && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.pic_name}
                            </p>
                        )}
                    </div>

                    {/* Описание */}
                    <div>
                        <textarea
                            value={data.pic_description}
                            onChange={(e) =>
                                setData('pic_description', e.target.value)
                            }
                            placeholder="Полное описание работы"
                            rows={5}
                            className="w-full rounded border border-neutral-300 px-3 py-2"
                        />

                        {errors.pic_description && (
                            <p className="mt-1 text-sm text-red-600">
                                {errors.pic_description}
                            </p>
                        )}
                    </div>

                    {/* Теги — только просмотр */}
                    <div>
                        <p className="mb-2 text-sm text-neutral-500">
                            Категории
                        </p>

                        <div className="flex flex-wrap gap-2">
                            {picture.tags.map((tag) => (
                                <span
                                    key={tag}
                                    className="rounded text-white px-3 py-1.5 text-base font-medium"
                                    style={{
                                        backgroundColor: `hsl(${getHueFromString(tag)}, 70%, 60%)`
                                    }}
                                >
                                    #{tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                <div className="flex justify-between border-t px-5 py-4">
                    {/* Удаление */}
                    <button
                        onClick={remove}
                        disabled={processing}
                        className="rounded bg-red-500 px-5 py-2 text-white hover:bg-red-600 disabled:opacity-40"
                    >
                        Удалить
                    </button>

                    <div className="flex gap-2">
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
        </div>
    );
}