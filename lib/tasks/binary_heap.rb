class BinaryHeap
    attr_reader :store

    def initialize(&prc)
        @store = []
    end

    def count
        @store.length
    end

    def extract
        @store[0], @store[-1] = @store[-1], @store[0]
        extracted_movie = @store.pop
        BinaryHeap.heapify_down(@store, 0)
        extracted_movie
    end

    def peek
        @store[0]
    end

    def push(movie)
        @store.push(movie)
        BinaryHeap.heapify_up(@store, @store.length - 1)
    end

    def self.child_indices(length, parent_idx)
        indices = []
        first_child_idx = parent_idx * 2 + 1
        indices << first_child_idx if first_child_idx < length
        second_child_idx = parent_idx * 2 + 2
        indices << second_child_idx if second_child_idx < length
        indices
    end

    def self.parent_index(child_index)
        raise 'root has no parent' if child_index == 0
        (child_index - 1) / 2
    end

    def self.heapify_down(store, parent_index, length=store.length, &prc)
        unless prc
            prc = Proc.new { |parent, child| parent[:predicted_rating] <=> child[:predicted_rating] }
        end

        child_indices = BinaryHeap.child_indices(length, parent_index)

        case child_indices.length
        when 0
            return store
        when 1
            # Swap child and parent if child's rating is greater than parent's rating
            if prc.call(store[parent_index], store[child_indices.first]) == -1
                store[parent_index], store[child_indices.first] = store[child_indices.first], store[parent_index]
            end
        when 2
            if (prc.call(store[parent_index], store[child_indices.first]) == -1 ||
                prc.call(store[parent_index], store[child_indices.last]) == -1)
                # If first is bigger than second
                if prc.call(store[child_indices.first], store[child_indices.last]) == 1
                    store[parent_index], store[child_indices.first] = store[child_indices.first], store[parent_index]
                else
                    store[parent_index], store[child_indices.last] = store[child_indices.last], store[parent_index]
                end
            end
        end

        BinaryHeap.heapify_down(store, child_indices.first, &prc)
        BinaryHeap.heapify_down(store, child_indices.last, &prc) if child_indices.length == 2
    end

    def self.heapify_up(store, child_index, length=store.length, &prc)
        unless prc
            prc = Proc.new { |parent, child| parent[:predicted_rating] <=> child[:predicted_rating] }
        end

        return store if child_index == 0

        parent_index = BinaryHeap.parent_index(child_index)

        if prc.call(store[parent_index], store[child_index]) == -1
            store[parent_index], store[child_index] = store[child_index], store[parent_index]
        end

        BinaryHeap.heapify_up(store, parent_index, &prc)
    end
end
