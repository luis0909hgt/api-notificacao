import { makeNotification } from "../../../test/factories/notification-factory";
import { InMemoryNotificationsRepository } from "../../../test/repositories/in-memory-notifications-repository";
import { Content } from "../entities/content";
import { Notification } from "../entities/notification";
import { CountRecipientNotification } from "./count-recipient-notification";

describe('Count recipient notifications', () => {
    it('should be able to count recipient notifications', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const countRecipientNotification = new CountRecipientNotification(notificationsRepository);

        const notification = new Notification({
            category: 'social',
            content: new Content('Nova solicitação de amizade!'),
            recipientId: 'example-recipient-id',
        });

        await notificationsRepository.create(
            makeNotification({recipientId: 'recipient-1'})
        );

        await notificationsRepository.create(
            makeNotification({recipientId: 'recipient-1'})
        );

        await notificationsRepository.create(
            makeNotification({recipientId: 'recipient-2'})
        );

        const { count } = await countRecipientNotification.execute({
            recipientId: 'recipient-1',
        });
        
        expect(count).toEqual(2);
    });
});